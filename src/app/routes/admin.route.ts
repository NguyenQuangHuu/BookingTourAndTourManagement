import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'list-vocabulary',
    loadComponent: () =>
      import('../features/dictionary/list-page/list-page').then((a) => a.ListPage),
    title: 'list-vocabulary',
  },
  {
    path: 'create-vocabulary',
    loadComponent: () =>
      import('../features/dictionary/create-vocab/create-vocab').then((a) => a.CreateVocab),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../pages/dashboard/dashboard').then((a) => a.Dashboard),
    title: 'Dashboard',
  },
];
