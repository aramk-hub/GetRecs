import React from 'react';
import {
  Flex,
  Heading,
  Image, 
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import logo from '../spotify-icons-logos/icons/RGB/PNG/Spotify_Icon_RGB_Green.png';
import { useNavigate, Navigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import background from "./record-image.jpeg";
import './signin.css'


const SignIn = () => {

   const formBackground = useColorModeValue('gray.100', 'gray.700');
   const CLIENT_ID = "659370cd953645b385b0e33e647be1a7";
   const SCOPES = "user-read-private user-read-email playlist-modify-public playlist-modify-private user-top-read"
   
  window.localStorage.setItem("time", Date.now());
  const REDIRECT_URI = "http://localhost:3000";

  const navigate = useNavigate();
  let codeVerifier = generateRandomString(128);

  // document.addEventListener('DOMContentLoaded', function GetFavColor() {
  //   document.body.style.backgroundColor = {background};
  // });

  useEffect(() => {
    
    
    

  }, []);

  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
  
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
  
    return base64encode(digest);
  }


  const handleLogin = async () => {
    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      let state = generateRandomString(16);
    
      window.localStorage.setItem('code_verifier', codeVerifier);
    
      let args = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPES,
        redirect_uri: REDIRECT_URI,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      });
      window.location = 'https://accounts.spotify.com/authorize?' + args;
    })
    await authorize();
    
  }

  const authorize = async () => {
    const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get('code'); 
      console.log(code);

      let codeVf = window.localStorage.getItem('code_verifier');

      let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: codeVf
      });

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
          }
          console.log(response)
          return response.json();
        })
        .then(data => {
          console.log(data)
          window.localStorage.setItem('token', data.access_token);
          console.log(data.access_token);
          console.log(window.localStorage.getItem('token'))
        })
        .catch(error => {
          console.error('Error:', error);
        });
      
      {window.localStorage.getItem('token') ? navigate('/search') : navigate('/')};
    }
    authorize();

  return (

    <div className='sign'>

    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        
        <Button colorScheme="brand" mb={8} onClick={handleLogin} >
          <Image src={logo} boxSize='25px'/> &nbsp; Sign in with Spotify
        </Button>
      </Flex>
    </Flex>
    </div>
  );
};

export default SignIn;
