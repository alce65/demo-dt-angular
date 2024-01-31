import { Component } from '@angular/core';
import { TasksComponent } from '../../components/tasks/tasks.component';

@Component({
  selector: 'dit-todo',
  standalone: true,
  imports: [TasksComponent],
  template: `
    <h2>{{ title }}</h2>
    <dit-tasks />
  `,
  styles: ``,
})
export default class TodoComponent {
  title = 'Todo list';
}
