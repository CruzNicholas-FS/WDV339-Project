
function Login() {
  return (
    <div className="container" style={styles.container}>
      <header>
      <div className='header' style={styles.header}>
            <img className='spotify-white' src={require("./white-logo.png")} alt="White Spotify logo" width="50" height="50"/>
      </div>
        <div style={styles.login}>
          <img src={require("./color-logo.png")} alt="Spotify logo" width="50" height="50"/>
          <h1>Please Login</h1>
          <p>To search for artists, albums, or songs, you must login to your Spotify account</p>
          <a href="http://localhost:3001/spotify/v1/login" style={styles.button}>Login</a>
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
  login:{
    "height":"100vh",
    "display":"flex",
    "flexDirection":"column",
    "alignItems":"center",
    "justifyContent":"center"
  },
  button:{
    "backgroundColor":"#1DB954",
    "textDecoration":"none",
    "borderRadius":"1em",
    "color":"white",
    "width":"15vw",
    "textAlign":"center",
    "fontSize":"24px",
    "padding":".25em"
  }
}

export default Login;
