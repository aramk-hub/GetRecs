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
import { useNavigate, Navigate, redirect } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { IoLogInOutline } from 'react-icons/io5';

const Logout = () => {

    const navigate = useNavigate();

    function logout() {
        console.log("trying to log out")
        window.localStorage.removeItem("token");
        navigate('/')
    }

    //logout(this);

    return (
        
        logout()
        
    );
}

export default Logout;