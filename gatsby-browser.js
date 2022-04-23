import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from './src/apollo/client';
import { BrowserRouter as Router } from 'react-router-dom'

export const wrapRootElement = ({ element }) => (
  <Router >
    <ApolloProvider client={client}>
      {element}
    </ApolloProvider>
  </Router>
);