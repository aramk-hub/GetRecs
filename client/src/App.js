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

const theme = extendTheme({
  colors: {
    brand: {
      100: "#B794F4",
      500: "#191414"
    }
  }
});

function App() {

  return (
    <ChakraProvider theme={theme}>
    <div className="App">
    <Router>

      {/* <div className="content"> */}

        <Routes>
          <Route exact path="/" element={<SignIn/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="logout" element={<Logout/>}/>
        </Routes>

      {/* </div> */}


    </Router>
    </div>
    </ChakraProvider>
  );
}

export default App;
