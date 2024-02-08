import { Component } from '@angular/core';
import { RegisterCourseComponent } from '../../../components/register-course/register-course.component';

@Component({
  selector: 'dit-courses2',
  standalone: true,
  imports: [RegisterCourseComponent],
  template: `
    <h3>Registro de alumno</h3>
    <dit-register-course></dit-register-course>
  `,
  styles: ``,
})
export default class Courses2Component {}
