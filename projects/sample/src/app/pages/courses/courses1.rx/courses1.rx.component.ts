import { Component } from '@angular/core';
import { CoursesListRxComponent } from '../../../components/courses-list/list-rx/courses-list.component';

@Component({
  selector: 'dit-courses1',
  standalone: true,
  imports: [CoursesListRxComponent],
  template: ` <dit-courses-list-rx></dit-courses-list-rx> `,
  styles: ``,
})
export default class Courses1RxComponent {}
