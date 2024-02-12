import { Route } from '@angular/router';

export const agencyFeatureRiderRoutes: Route[] = [
  {
    loadComponent: () => import('./components/riders').then(module => module.RidersComponent),
    path: '',
  },
  // {
  //   children: [
  //     { path: '**', redirectTo: 'detail' }
  //   ],
  //   loadComponent: () => import('./components/rider-detail').then(module => module.RiderDetailComponent),
  //   path: 'rider/:recordId',
  // },
  { path: '**', redirectTo: '' },
];
