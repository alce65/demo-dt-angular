import { Component } from '@angular/core';
import { TasksComponent } from '../../components/tasks/tasks.component';
import { TasksListComponent } from '../../components/tasks-list/tasks-list.component';

@Component({
  selector: 'dit-todo',
  standalone: true,
  imports: [TasksComponent, TasksListComponent],
  template: `
    <h2>{{ title }}</h2>
    <h3>List all-in-one</h3>
    <dit-tasks />
    <h3>List controller/presenter</h3>
    <dit-tasks-list />
  `,
  styles: ``,
})
export default class TodoComponent {
  title = 'Todo list';
}
