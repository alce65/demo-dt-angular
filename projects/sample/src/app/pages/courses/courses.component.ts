import { Component } from '@angular/core';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'dit-courses',
  standalone: true,
  imports: [RouterModule, CoursesListComponent, MenuComponent],
  template: `
    <h2>{{ title }}</h2>
    <div class="menu-container">
      <dit-menu [options]="options" />
    </div>
    <router-outlet />
  `,
  styles: `
    .menu-container {
      margin-bottom: 1rem;
    }`,
})
export default class CoursesComponent {
  title = 'Courses';
  options = [
    { label: 'Lista de cursos', path: 'list' },
    { label: 'Lista de cursos Rx', path: 'list-rx' },
    { label: 'Registro de alumno', path: 'register' },
  ];
}
