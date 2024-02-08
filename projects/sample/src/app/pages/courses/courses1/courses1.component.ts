import { Component } from '@angular/core';
import { CoursesListComponent } from '../../../components/courses-list/courses-list.component';

@Component({
  selector: 'dit-courses1',
  standalone: true,
  imports: [CoursesListComponent],
  template: ` <dit-courses-list></dit-courses-list> `,
  styles: ``,
})
export default class Courses1Component {}
