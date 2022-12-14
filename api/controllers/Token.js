const {CLIENT_ID, CLIENT_SECRET}=process.env
const randomstring=require("randomstring");
const qs=require("qs");
const axios = require("axios");
const {SpotifyToken}=require("../models");

const basicAuth = 'Basic ' + (new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'))
const redirect_uri = 'http://localhost:3001/spotify/v1/auth'
const now = new Date().getTime()

const login = async(req, res)=>{
    const state = randomstring.generate(16);
    const scope = 'user-read-private user-read-email';
    res.redirect(`https://accounts.spotify.com/authorize?${qs.stringify({
      response_type: "code",
      client_id: CLIENT_ID,
      scope:scope,
      redirect_uri:redirect_uri,
      state:state
    })}`);
}

const auth = async (req, res) => {
    if (req.token) {
      return res.redirect('http://localhost:3000')
    } else {
      return res.redirect('http://localhost:3000/login')
    }
}

const requestToken = (code, grant_type, token)=>{
    const data = qs.stringify({code, grant_type, redirect_uri})
    return axios({
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token', 
      data,
      headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(({ data }) => {
      data.expires_in = new Date().getTime() + data.expires_in
      token.set({
        accessToken:data.access_token,
        tokenType:data.token_type,
        expiresIn:data.expires_in,
        refreshToken:data.refresh_token
      })
      return token.save()
    }).catch((error) => { console.log(error) })
}

const refreshToken = (refreshToken, grantType, token)=>{
  const data= qs.stringify({refresh_token:refreshToken, grant_type:grantType})
  return axios({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token', 
    data,
    headers: {
      'Authorization': basicAuth,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(({ data }) => {
    data.expires_in = new Date().getTime() + data.expires_in
    token.set({
      accessToken:data.access_token,
      tokenType:data.token_type,
      expiresIn:data.expires_in,
      refreshToken:data.refresh_token
    })
    return token.save()
  }).catch((error) => { console.log(error) })
}

const jwt = async(req, res, next)=>{
    req.token=await SpotifyToken.findOne({where:{}});

    if(!req.token && !req.query.code) {return next()};

    if(!req.token && req.query.code){
        req.token=await requestToken(req.query.code, "authorization_code", SpotifyToken.build({}))
    } else if(now>req.token.expiresIn){
        req.token=await refreshToken(req.token.refreshToken, "refresh_token", req.token)
    }

    if(!req.token){console.log("Token could not be requested")}
    return next();
}

const status = async (req, res) => {
    const valid = (req.token && req.token.expiresIn > now) ? true : false
    res.json({valid})
  }

const search = async (req, res) => {
    await axios({
    method:"GET",
    url:"https://api.spotify.com/v1/search",
    params: {
        type: 'album,artist,track',
        q: req.query.q,
        limit: 3
      },
    headers: { 
        'Authorization': `Bearer ${req.token.accessToken}`,
        'Content-Type': 'application/json'
      }
    }).then(({data}) => {
      res.json(data)
    }).catch((error) => {
      res.json(error)
    })
  }

module.exports={login, auth, status, search, jwt}