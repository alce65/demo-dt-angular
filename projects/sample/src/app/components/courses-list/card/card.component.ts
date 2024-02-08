import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Course } from '../../../entities/course';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dit-card',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input type="checkbox" [checked]="course.isDone" (change)="onChange()" />
    <!-- <span
      #title
      [class.done]="course.isDone"
      [contentEditable]="isEdited"
      (blur)="onSave()"
      tabindex="0"
      >{{ course.title }}</span
    > -->
    <input
      #title
      type="text"
      [readOnly]="!isEdited"
      [(ngModel)]="course.title"
      (blur)="onSave()"
    />

    <input
      type="text"
      [readOnly]="!isEdited"
      [(ngModel)]="course.author"
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
  @Input() course!: Course;
  @Output() eventChange = new EventEmitter<Course>();
  @Output() eventDelete = new EventEmitter<Course['id']>();
  @ViewChild('title', { static: true }) title!: ElementRef;
  isEdited = false;

  ngOnInit(): void {
    this.course = { ...this.course };
  }

  onEdit() {
    this.isEdited = !this.isEdited;
    this.title.nativeElement.focus();
  }

  onSave() {
    if (!this.isEdited) return;
    this.isEdited = !this.isEdited;
    this.eventChange.emit(this.course);
  }

  onChange() {
    this.course.isDone = !this.course.isDone;
    this.eventChange.emit(this.course);
  }
  onDelete() {
    this.eventDelete.emit(this.course.id);
  }
}
