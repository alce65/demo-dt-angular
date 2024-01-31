import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent() {
      return import('./pages/home/home.component');
    },
  },
  {
    path: 'todo',
    loadComponent() {
      return import('./pages/todo/todo.component');
    },
  },
  {
    path: 'about',
    loadComponent() {
      return import('./pages/about/about.component');
    },
  },
  { path: '**', redirectTo: 'home' },
];
