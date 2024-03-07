import { Route } from '@angular/router';

export const agencyFeatureRiderRoutes: Route[] = [
  {
    loadComponent: () => import('./components/riders').then(module => module.RidersComponent),
    path: '',
  },
  {
    children: [
      {
        data: { activeTab: 'detail' },
        loadComponent: () => import('@dsg/shared/feature/riders').then(module => module.IntakeFormComponent),
        path: '',
      },
    ],
    loadComponent: () => import('@dsg/shared/feature/riders').then(module => module.NewRideReservationComponent),
    path: ':recordId/transaction/:transactionId',
  },
  {
    children: [
      {
        data: { activeTab: 'detail' },
        loadComponent: () => import('@dsg/shared/feature/riders').then(module => module.RiderDetailsComponent),
        path: 'detail',
      },
      {
        data: { activeTab: 'rides' },
        loadComponent: () => import('@dsg/shared/feature/riders').then(module => module.RiderRidesComponent),
        path: 'rides',
      },
      {
        data: { activeTab: 'locations' },
        loadComponent: () => import('@dsg/shared/feature/riders').then(module => module.RiderSavedLocationsComponent),
        path: 'locations',
      },
      {
        data: { activeTab: 'payments' },
        loadComponent: () => import('@dsg/shared/feature/riders').then(module => module.RiderPaymentsComponent),
        path: 'payments',
      },
      {
        data: { activeTab: 'communication' },
        loadComponent: () => import('@dsg/shared/feature/riders').then(module => module.RiderCommunicationLogComponent),
        path: 'communication',
      },
      { path: '**', redirectTo: 'detail' },
    ],
    loadComponent: () => import('./components/rider-profile').then(module => module.RiderProfileComponent),
    path: ':recordId',
  },
  { path: '**', redirectTo: '' },
];
