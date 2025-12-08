import type { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { buildApolloLink } from './apollo.links';
import { getTypePolicies } from './apollo.cache-policies';
import { getDefaultOptions } from './apollo.defaults';

export function createApolloOptions(): ApolloClient.Options {
  const link = buildApolloLink();

  const cache = new InMemoryCache({
    typePolicies: getTypePolicies(),
  });

  return {
    link,
    cache,
    defaultOptions: getDefaultOptions(),
  };
}
