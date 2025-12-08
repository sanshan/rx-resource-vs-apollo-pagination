import { Routes } from '@angular/router';
import { OffsetPaginationApolloClient } from './offset-pagination-apollo-client/offset-pagination-apollo-client';
import { OffsetPaginationRxResource } from './offset-pagination-rx-resource/offset-pagination-rx-resource';

export const offsetRoutes: Routes = [
  {
    path: 'apollo-client',
    loadComponent: () => OffsetPaginationApolloClient,
  },
  {
    path: 'rx-resource',
    loadComponent: () => OffsetPaginationRxResource,
  },
];
