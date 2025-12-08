import type { ApolloClient } from '@apollo/client';

export function getDefaultOptions(): ApolloClient.DefaultOptions {
  return {
    watchQuery: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
      nextFetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  };
}
