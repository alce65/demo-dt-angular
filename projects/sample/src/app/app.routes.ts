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
    path: 'courses',
    loadComponent() {
      return import('./pages/courses/courses.component');
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        loadComponent() {
          return import('./pages/courses/courses1/courses1.component');
        },
      },
      {
        path: 'list-rx',
        loadComponent() {
          return import('./pages/courses/courses1.rx/courses1.rx.component');
        },
      },
      {
        path: 'register',
        loadComponent() {
          return import('./pages/courses/courses2/courses2.component');
        },
      },
      { path: '**', redirectTo: 'list' },
    ],
  },
  {
    path: 'about',
    loadComponent() {
      return import('./pages/about/about.component');
    },
  },
  { path: '**', redirectTo: 'home' },
];
