import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent() {
      return import('./page/home/home.component');
    },
  },
  {
    path: 'about',
    loadComponent() {
      return import('./page/about/about.component');
    },
  },
  { path: '**', redirectTo: 'home' },
];
