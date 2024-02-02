import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Task } from '../../../entities/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dit-card',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input type="checkbox" [checked]="task.isDone" (change)="onChange()" />
    <!-- <span
      #title
      [class.done]="task.isDone"
      [contentEditable]="isEdited"
      (blur)="onSave()"
      tabindex="0"
      >{{ task.title }}</span
    > -->
    <input
      #title
      type="text"
      [readOnly]="!isEdited"
      [(ngModel)]="task.title"
      (blur)="onSave()"
    />

    <div>
      <button (click)="onEdit()" [disabled]="isEdited">Edit</button>
      <button (click)="onDelete()">Remove</button>
    </div>
  `,
  styles: `
  :host {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px;
  }
  input {
    border: none;
    background-color: transparent;
  }
  `,
})
export class CardComponent implements OnInit {
  @Input() task!: Task;
  @Output() eventChange = new EventEmitter<Task>();
  @Output() eventDelete = new EventEmitter<Task['id']>();
  @ViewChild('title', { static: true }) title!: ElementRef;
  isEdited = false;

  ngOnInit(): void {
    this.task = { ...this.task };
  }

  onEdit() {
    this.isEdited = !this.isEdited;
    this.title.nativeElement.focus();
  }

  onSave() {
    if (!this.isEdited) return;
    this.isEdited = !this.isEdited;
    this.eventChange.emit(this.task);
  }

  onChange() {
    this.task.isDone = !this.task.isDone;
    this.eventChange.emit(this.task);
  }
  onDelete() {
    this.eventDelete.emit(this.task.id);
  }
}
