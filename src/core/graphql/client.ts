import { ApolloClient } from '@apollo/client';
import { rootLink } from './links';
import { cache } from './cache';

export const graphqlClient = new ApolloClient({
  link: rootLink,
  cache: cache
});