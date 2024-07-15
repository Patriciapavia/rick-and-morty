import React, { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as Provider , HttpLink} from '@apollo/client';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

interface ApolloClientProviderProps {
  children: ReactNode;
}

const ApolloClientProvider: React.FC<ApolloClientProviderProps> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloClientProvider;
