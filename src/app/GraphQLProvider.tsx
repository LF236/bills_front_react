
import { ApolloProvider } from '@apollo/client/react';
import { graphqlClient } from '../core/graphql/client';

interface Props {
  children: React.ReactNode;
}

export function GraphQLProvider({children} : Props) {
  return <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>;
}