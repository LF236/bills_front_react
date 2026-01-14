import { ApolloLink, HttpLink } from '@apollo/client';
import { env } from '../../config';
import { ErrorLink } from '@apollo/client/link/error';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors
} from '@apollo/client/errors';

const httpLink = new HttpLink({
  uri: env.GPL_URL,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('x-access-token');

  if(token) {
    operation.setContext(( headers = {} ) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      }
    }));
  }

  return forward(operation);
});

const errorLink = new ErrorLink(({error}) => {
  if(CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(( {message, locations, path} ) => (
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )) 
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach( ( {message, extensions} ) => (
      console.log(`[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(extensions)}`)
    ))
  } else {
    console.error(`[Network error]: ${error}`);
  }
});

export const rootLink = ApolloLink.from([
  errorLink,
  authLink,
  httpLink
]);