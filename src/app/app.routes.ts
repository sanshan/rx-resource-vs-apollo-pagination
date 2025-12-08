import { Routes } from '@angular/router';
import { offsetRoutes } from './screens/offset-pagination/routes';

export const routes: Routes = [
  {
    path: 'offset',
    loadChildren: () => offsetRoutes,
  },
];
