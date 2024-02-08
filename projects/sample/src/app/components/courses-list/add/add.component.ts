import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataCourse } from '../../../entities/course';

@Component({
  selector: 'dit-add',
  standalone: true,
  imports: [FormsModule],
  template: `
    <details #details>
      <summary>Add course</summary>

      <input
        type="text"
        placeholder="Titulo del curso"
        [(ngModel)]="newCourseTitle"
      />

      <input
        type="text"
        placeholder="Autor del curso"
        [(ngModel)]="newCourseAuthor"
      />
      <button (click)="onAdd()">Add</button>
    </details>
  `,
  styles: ``,
})
export class AddComponent {
  newCourseTitle = '';
  newCourseAuthor = '';
  @Output() addEvent = new EventEmitter<DataCourse>();
  @ViewChild('details', { static: true }) refDetails!: ElementRef;

  onAdd() {
    const data: DataCourse = {
      title: this.newCourseTitle,
      author: this.newCourseAuthor,
    };
    this.addEvent.emit(data);
    this.newCourseTitle = '';
    this.refDetails.nativeElement.open = false;
  }
}
