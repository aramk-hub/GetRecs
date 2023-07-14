import React from 'react'
import logo from './logo.svg';

import { Button, ButtonGroup, ChakraProvider, Stack, extendTheme } from '@chakra-ui/react'
import SignIn from './SignIn';

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
      <SignIn/>
    </ChakraProvider>
      
  );
}

export default App;
