import { Routes } from '@angular/router';
import { Login, authGuard } from '@org/auth-ui';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home.component.js').then((m) => m.HomeComponent),
  },
];
