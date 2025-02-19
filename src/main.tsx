import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ApolloClientProvider from './apollo-client';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
    <ApolloClientProvider>
      <App />
      </ApolloClientProvider>
      </ChakraProvider>
  </React.StrictMode>
);
