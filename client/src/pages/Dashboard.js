import React from 'react'
import logo from './logo.svg';

import { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

import { Button, ButtonGroup, ChakraProvider, Stack, extendTheme } from '@chakra-ui/react'
import SignIn from './pages/SignIn';
import Sidebar from './components/Sidebar';
import Search from './pages/Search';
import Logout from './pages/Logout';
import { FiLogOut } from 'react-icons/fi';

function Dashboard() {

  return (
      <div className='dashboard' margin='0 auto' overflow-y='auto'>
          <Sidebar/>

            

      </div>
    
  );
}

export default Dashboard;
