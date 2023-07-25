import React from 'react'

import { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

import { Button, ButtonGroup, ChakraProvider, Stack, extendTheme } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar';
import { FiLogOut } from 'react-icons/fi';
import axios from 'axios'

function Dashboard() {

    const token = window.localStorage.getItem("token");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
        const{data} = await axios({
            url: 'https://api.spotify.com/v1/me',
            
            method: 'get',
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        setUser(data);
    }
    fetchUser();       
    }, []);

    const getTopArtists = async (timerange, limit) => {
        const{data} = await axios({
            url: 'https://api.spotify.com/v1/me/top/artists',
            params: {
                time_range: timerange,
                limit: limit,
            },
            method: 'get',
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        return data;
    }

    const getTopTracks = async (timerange, limit) => {
        const{data} = await axios({
            url: 'https://api.spotify.com/v1/me/top/tracks',
            params: {
                time_range: timerange,
                limit: limit,
            },
            method: 'get',
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        return data;
    }

    // const getTopGenres = (topArtists) = {

    // }



  return (
      <div className='dashboard' margin='0 auto' overflow-y='auto'>
          <Sidebar/>



      </div>
    
  );
}

export default Dashboard;
