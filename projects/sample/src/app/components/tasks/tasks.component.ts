import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../entities/task';
import { getTasks } from '../../repo/task.mock.repo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dit-tasks',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTask: string = '';
  @ViewChild('details', { static: true }) refDetails!: ElementRef;

  constructor() {
    console.log('Constructor', this.refDetails);
  }

  async ngOnInit(): Promise<void> {
    console.log('OnInit', this.refDetails);
    this.tasks = await getTasks();
  }

  onAdd() {
    const task: Task = {
      id: crypto.randomUUID(),
      title: this.newTask,
      isDone: false,
    };

    this.tasks.push(task);
    this.newTask = '';
    console.log(this.tasks);
    this.refDetails.nativeElement.open = false;
  }

  // onAddRef(value: string) {
  //   console.log(value);
  // }

  onChange(task: Task) {
    task.isDone = !task.isDone;
    console.log(this.tasks);
  }

  onDelete(deletedTask: Task) {
    this.tasks = this.tasks.filter((task) => task.id !== deletedTask.id);
    console.log(this.tasks);
  }
}
