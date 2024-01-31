import { Component, OnInit } from '@angular/core';
import { Task } from '../../entities/task';
import { getTasks } from '../../repo/task.mock.repo';

@Component({
  selector: 'dit-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  async ngOnInit(): Promise<void> {
    this.tasks = await getTasks();
  }

  onChange(task: Task) {
    task.isDone = !task.isDone;
    console.log(this.tasks);
  }

  onDelete(deletedTask: Task) {
    this.tasks = this.tasks.filter((task) => task.id !== deletedTask.id);
    console.log(this.tasks);
  }
}
