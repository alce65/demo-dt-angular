import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dit-add',
  standalone: true,
  imports: [FormsModule],
  template: `
    <details #details>
      <summary>Add task</summary>

      <input
        type="text"
        placeholder="Titulo de la tarea"
        [(ngModel)]="newTaskTitle"
      />
      <button (click)="onAdd()">Add</button>
    </details>
  `,
  styles: ``,
})
export class AddComponent {
  newTaskTitle = '';
  @Output() addEvent = new EventEmitter<string>();
  @ViewChild('details', { static: true }) refDetails!: ElementRef;

  onAdd() {
    this.addEvent.emit(this.newTaskTitle);
    this.newTaskTitle = '';
    this.refDetails.nativeElement.open = false;
  }
}
