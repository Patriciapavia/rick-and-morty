import React, { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql', // Use the proxy path
  cache: new InMemoryCache(),
});

interface ApolloClientProviderProps {
  children: ReactNode;
}

const ApolloClientProvider: React.FC<ApolloClientProviderProps> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloClientProvider;
