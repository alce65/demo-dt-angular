import { Component, OnInit } from '@angular/core';
import { Task } from '../../entities/task';
import { getTasks } from '../../repo/task.mock.repo';
import { AddComponent } from './add/add.component';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'dit-tasks-list',
  standalone: true,
  imports: [AddComponent, CardComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: string = '';

  async ngOnInit(): Promise<void> {
    this.tasks = await getTasks();
  }

  onAdd(taskTitle: string) {
    const task: Task = {
      id: crypto.randomUUID(),
      title: taskTitle,
      isDone: false,
    };
    this.tasks.push(task);
    console.log(this.tasks);
  }

  onChange(updatedTask: Task) {
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    console.log(this.tasks);
  }

  onDelete(deletedId: Task['id']) {
    this.tasks = this.tasks.filter((task) => task.id !== deletedId);
    console.log(this.tasks);
  }
}
