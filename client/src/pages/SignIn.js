import React from 'react';
import {
  Flex,
  extendTheme,
  Link,
  Heading,
  Input,
  Image, 
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import logo from '../spotify-icons-logos/icons/RGB/PNG/Spotify_Icon_RGB_Green.png';
import { useNavigate, Navigate } from 'react-router-dom';
import {useEffect, useState} from 'react';


const SignIn = () => {
   const { toggleColorMode } = useColorMode();
   const formBackground = useColorModeValue('gray.100', 'gray.700');
   const CLIENT_ID = "659370cd953645b385b0e33e647be1a7";
    
   const REDIRECT_URI = "https:localhost:3000";
   const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
   const RESPONSE_TYPE = "token";
   const SCOPES = "user-read-private user-read-email"
   const path = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;

  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem =>elem.startsWith("access_token")).split("=")[1];

        window.location.hash = ""
        window.localStorage.setItem("token", token);
        
    }
    setToken(token);
    console.log(token);
    
    {token ? navigate('/search') : navigate('/')};

  }, []);

  const handleClick = () => {
    window.location.href = path;
  }

  return (

    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        
        <Button colorScheme="brand" mb={8} onClick={handleClick}>
          <Image src={logo} boxSize='25px'/> &nbsp; Sign in with Spotify
        </Button>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Enable Dark Mode?
          </FormLabel>
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
        </FormControl>
      </Flex>
    </Flex>
    
  );
};

export default SignIn;
