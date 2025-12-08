import { inject } from '@angular/core';
import { ApolloLink } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

export const GRAPHQL_HTTP_URI = '/graphql';

export function buildApolloLink(): ApolloLink {
  const httpLink = inject(HttpLink).create({ uri: GRAPHQL_HTTP_URI });

  return ApolloLink.from([httpLink]);
}
