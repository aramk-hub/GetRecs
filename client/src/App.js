import React from 'react'
import logo from './logo.svg';

import { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

import { Button, ButtonGroup, ChakraProvider, Stack, extendTheme } from '@chakra-ui/react'
import SignIn from './pages/SignIn';
import Search from './pages/Search';
import Logout from './pages/Logout';
import Statistics from './pages/Statistics'

const theme = extendTheme({
  colors: {
    brand: {
      100: "#B794F4",
      500: "#191414"
    }
  }
});

function App() {

  var hours = 1; // to clear the localStorage after 1 hour
               // (if someone want to clear after 8hrs simply change hours=8)
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('setupTime');
  if (setupTime == null) {
      localStorage.setItem('setupTime', now)
  } else {
      if(now-setupTime > hours*60*60*1000) {
          localStorage.clear()
          localStorage.setItem('setupTime', now);
      }
  }

  return (
    <ChakraProvider theme={theme}>
    <div className="App">
    <Router>

      {/* <div className="content"> */}

        <Routes>
          <Route exact path="/" element={<SignIn/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/statistics" element={<Statistics/>}/>
          <Route path="logout" element={<Logout/>}/>
        </Routes>

      {/* </div> */}


    </Router>
    </div>
    </ChakraProvider>
  );
}

export default App;
