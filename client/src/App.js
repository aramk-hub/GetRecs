import React from 'react'
import logo from './logo.svg';

import { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

import { Button, ButtonGroup, ChakraProvider, Stack, extendTheme } from '@chakra-ui/react'
import SignIn from './pages/SignIn';
import Sidebar from './components/Sidebar';
import About from './pages/About';

const theme = extendTheme({
  colors: {
    brand: {
      100: "#B794F4",
      500: "#191414"
    }
  }
});

function App() {

  // const CLIENT_ID = "2ba03b82f1d3454184efa1859c5b3c71";
    
  // const REDIRECT_URI = "http://localhost:3000";
  // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  // const RESPONSE_TYPE= "token";

  // const [token, setToken] = useState("");
  // const [searchKey, setSearchKey] = useState("");
  // const [artists, setArtists] = useState([]);

  // useEffect(() => {
  //     const hash = window.location.hash;
  //     let token = window.localStorage.getItem("token");

  //     if (!token && hash) {
  //         token = hash.substring(1).split("&").find(elem =>elem.startsWith("access_token")).split("=")[1];

  //         window.location.hash = "";
  //         window.localStorage.setItem("token", token);
          
  //     }
  //     setToken(token);
  //     console.log(token)

  // }, []);

  // const logout = () => {
  //   setToken("")
  //   window.localStorage.removeItem("token");
  // }


  return (
    <Router>
      <ChakraProvider theme={theme}>
        <div className='App'>
        

        
        <Routes>
          <Route exact path="/" element={<SignIn/>}/>
          <Route exact path="/about" element={<About/>}/>
          {/* <Route path="/logout" element={<Logout/>}/> */}
          
          
        </Routes>

        
        
          
          

      
        </div>
      </ChakraProvider>
    </Router>
        
  );
}

export default App;
