import { Component, OnInit } from '@angular/core';
import { Course, DataCourse } from '../../entities/course';

import { AddComponent } from './add/add.component';
import { CardComponent } from './card/card.component';
import { CoursesFetchRepoService } from '../../services/courses.fetch.repo.service';

@Component({
  selector: 'dit-courses-list',
  standalone: true,
  imports: [AddComponent, CardComponent],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css',
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  newCourse: string = '';

  constructor(public repo: CoursesFetchRepoService) {}

  ngOnInit(): void {
    this.repo
      .getAll()
      .then((courses) => (this.courses = courses))
      .catch((error) => ({ error }));
  }

  onAdd(courseData: DataCourse) {
    this.repo
      .add(courseData)
      .then((courses) => {
        this.courses = [...this.courses, ...courses];
        console.log({ courses });
      })
      .catch((error) => console.error({ error }));
  }

  onChange(updatedCourse: Course) {
    this.repo
      .update(updatedCourse.id, updatedCourse)
      .then((courses) => {
        this.courses = this.courses.map((course) =>
          course.id === updatedCourse.id
            ? { ...course, ...courses[0] }
            : course,
        );
        console.log({ courses });
      })
      .catch((error) => console.error({ error }));
  }

  onDelete(deletedId: Course['id']) {
    this.repo
      .delete(deletedId)
      .then((courses) => {
        this.courses = this.courses.filter(
          (course) => course.id !== courses[0].id,
        );
        console.log({ courses });
      })
      .catch((error) => console.error({ error }));
  }
}
