import type { TypePolicies } from '@apollo/client/cache';

export function getTypePolicies(): TypePolicies {
  return {
    Query: {
      fields: {
        // Cursor-based connection example
        // Offset-based
        // FindAllItems: {
        //   keyArgs: ['userId', 'type', 'q', 'sort', 'limit'],
        //   merge(_existing, incoming) {
        //     return incoming;
        //   },
        // },
      },
    },
  };
}
