import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'

function App() {
    const CLIENT_ID = "2ba03b82f1d3454184efa1859c5b3c71";
    const CLIENT_SECRET = "529cf05446f34c0cb5a94c38953b2ef9";
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE= "token";

    const [token, setToken] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem =>elem.startsWith("access_token")).split("=")[1];

            window.location.hash = ""
            window.localStorage.setItem("token", token);
            
        }
        setToken(token);
        console.log(token)

    }, []);

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token");
    }

    const getArtists = async (e) => {
        e.preventDefault()
        const{data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization : `Bearer ${token}`
            }, 
            params: {
                q: searchKey, 
                type: "artist",
                limit: "5"
            }
        })

        console.log(data);
        setArtists(data.artists.items.sort((a) => a.popularity));
    }

    const renderArtists = () => {
        // openArtist = (e) => {
        //     e.preventDefault();
        //     const{data} = await axios.get(artist.href, {
        //     headers: {
        //         Authorization : `Bearer ${token}`
        //     }
            
        // })
        // console.log("Tried to open artist link")
        
    
         
        return artists.map(artist => (
            <>
                {/* <a href={artist.href} target="_blank" onClick={this.openArtist}>{artist.name}</a> */}
                <div key={artist.id}>
                    
                    {artist.images.length ? <img width={"50%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                    
                </div>
            </>
            
        ))
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>GetRecs</h1>
                <h2>Spotify recommendations based on what you want to hear.</h2>
                {!token ?
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
                : <button onClick={logout}>Logout</button>}

                {token ? 
                    <form onSubmit={getArtists}>
                        <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                        <button type={"submit"}>Search</button>
                    </form>
                    : <h2></h2>
                }

                {renderArtists()}
            </header>
        </div>
    );
}

export default App;
