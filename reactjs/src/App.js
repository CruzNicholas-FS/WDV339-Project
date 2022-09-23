import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";

function App() {
  const navigate = useNavigate();
  const path = "/spotify/v1";
  const specify = "/auth";
  const searchInput = useRef("");

  const [albums, setAlbums]=useState([]);
  const [artists, setArtists]=useState([]);
  const [songs, setSongs]=useState([]);
  const [hoverId, setHoverId]=useState("");
  const search = (e) =>{
    e.preventDefault();
    fetch(`http://localhost:3001/spotify/v1/search?q=${searchInput.current.value}`)
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
      setAlbums(data.albums.items)
      setArtists(data.artists.items)
      setSongs(data.tracks.items)
      console.log(albums)
    })
    .catch(error=>console.error(error))
  }
  useEffect(()=>{
    fetch(`http://localhost:3001${path}${specify}`).then(data=>data.url==="http://localhost:3000/" ? navigate("/"):navigate("/login")).catch(error=>console.log(error))
  }, [])
  return (
    <div style={styles.container}>
        <header>
          <div className='header' style={styles.header}>
            <img className='spotify-white' src={require("./white-logo.png")} alt="White Spotify logo" width="50" height="50"/>
            <form className='search-form' style={styles.searchForm}>
              <img style={styles.searchIcon} className='search-icon' src={require("./search-icon.png")} alt="Search icon" width="25" height="25"/>
              <input style={styles.searchInput} onChange={(e)=>search(e)} type="text" ref={searchInput} placeholder="Search for artist, album, or song" required/>
            </form>
          </div>
          <div className="no-results" style={albums.length === 0 ? styles.noResults:styles.noResultsOff}>
            <img src={require("./color-logo.png")} alt="Spotify logo" width="50" height="50"/>
            <h1 className="no-results-heading">No Results</h1>
            <p>Please type in a search query to get started...</p>
          </div>
          
          <div style={styles.albums}>
            <h3 style={styles.title}>Albums <FaArrowRight/> </h3>
            <ul style={styles.list}>
              {
                albums.map(album=>{
                  return(
                    <li style={styles.item} key={album.id}>
                      <a onMouseEnter={()=>setHoverId(album.id)} onMouseLeave={()=>setHoverId("")} style={styles.link} href={album.external_urls.spotify} width="150" height="150">
                        <div style={hoverId === album.id ? styles.showInfo:styles.noInfo}>
                          <h4>{album.name}</h4>
                          <p>{album.artists[0].name}</p>
                        </div>
                        <img style={styles.image} src={album.images[1].url} alt="Album cover" width="200" height="200"/>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </div>

          <div style={styles.albums}>
            <h3 style={styles.title}>Artists <FaArrowRight/> </h3>
            <ul style={styles.list}>
              {
                artists.map(artist=>{
                  return(
                    <li style={styles.item} key={artist.id}>
                      <a onMouseEnter={()=>setHoverId(artist.id)} onMouseLeave={()=>setHoverId("")} style={styles.link} href={artist.external_urls.spotify} width="150" height="150">
                        <div style={hoverId === artist.id ? styles.showInfo:styles.noInfo}>
                          <h4>{artist.name}</h4>
                        </div>
                        <img style={styles.image} src={artist.images[1].url} alt="Album cover" width="200" height="200"/>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </div>

          <div style={styles.albums}>
            <h3 style={styles.title}>Albums <FaArrowRight/> </h3>
            <ul style={styles.list}>
              {
                songs.map(song=>{
                  return(
                    <li style={styles.item} key={song.id}>
                      <a onMouseEnter={()=>setHoverId(song.id)} onMouseLeave={()=>setHoverId("")} style={styles.link} href={song.external_urls.spotify} width="150" height="150">
                        <div style={hoverId === song.id ? styles.showInfo:styles.noInfo}>
                          <h4>{song.name}</h4>
                          <p>{song.artists[0].name}</p>
                        </div>
                        <img style={styles.image} src={song.album.images[1].url} alt="Album cover" width="200" height="200"/>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </header>
    </div>
  );
}

const styles = {
  container:{
    "width":"100vw",
    "height":"100vh",
    "backgroundColor":"#171413",
    "color":"white"
  },
  header:{
    "backgroundColor":"#1DB954",
    "width":"100vw",
    "display":"flex",
    "alignItems":"center",
    "position":"relative",
    "top":0,
    "padding":"1em"
  },
  searchForm:{
    "width":"100vw",
    "display":"flex",
    "alignItems":"center",
    "justifyContent":"center"
  },
  searchIcon:{
    "filter":"invert(1)"
  },
  searchInput:{
    "background":"none",
    "border":"none",
    "borderBottom":"1px solid white",
    "width":"20vw",
    "color":"white",
    "marginLeft":"1em",
    "outline":"none"
  },
  noResults:{
    "height":"100vh",
    "display":"flex",
    "flexDirection":"column",
    "alignItems":"center",
    "justifyContent":"center"
  },
  noResultsOff:{
    "display":"none"
  },
  albums:{
    "width":"100vw",
    "display":"flex",
    "alignItems":"center",
    "justifyContent":"center",
    "marginTop":"3em"
  },
  title:{
    "borderBottom":"1px solid white"
  },
  list:{
    "listStyle":"none",
    "display":"flex"
  },
  item:{
    "marginLeft":"5em"
  },
  link:{
    "width":"200px",
    "height":"200px",
    "textDecoration":"none"
  },
  noInfo:{
    "display":"none"
  },
  showInfo:{
    "width":"200px",
    "height":"200px",
    "textAlign":"center",
    "position":"absolute",
    "display":"flex",
    "flexDirection":"column",
    "alignItems":"center",
    "justifyContent":"center",
    "color":"white",
    "backgroundColor":"rgba(0,0,0,0.75)"
  },
  image:{
    "zIndex":-1
  }
}

export default App;
