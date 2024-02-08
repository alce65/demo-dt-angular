import { Component, OnInit } from '@angular/core';
import { Course, DataCourse } from '../../../entities/course';
import { AddComponent } from '../add/add.component';
import { CardComponent } from '../card/card.component';
import { CoursesApiRxRepoService } from '../../../services/courses.api.rx.repo.service';

@Component({
  selector: 'dit-courses-list-rx',
  standalone: true,
  imports: [AddComponent, CardComponent],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css',
})
export class CoursesListRxComponent implements OnInit {
  courses: Course[] = [];
  newCourse: string = '';

  constructor(public repo: CoursesApiRxRepoService) {}

  ngOnInit(): void {
    this.repo.getAll().subscribe((courses) => (this.courses = courses));
  }

  onAdd(courseData: DataCourse) {
    this.repo.add(courseData).subscribe({
      next: (course) => {
        this.courses = [...this.courses, course];
        console.log({ courses: course });
      },
      error: (error) => console.error({ error }),
    });
  }

  onChange(updatedCourse: Course) {
    this.repo.update(updatedCourse.id, updatedCourse).subscribe({
      next: (updateCourse) => {
        this.courses = this.courses.map((course) =>
          course.id === updatedCourse.id
            ? { ...course, ...updateCourse }
            : course,
        );
        console.log({ courses: updateCourse });
      },
      error: (error) => console.error({ error }),
    });
  }

  onDelete(deletedId: Course['id']) {
    this.repo.delete(deletedId).subscribe({
      next: (deletedCourse) => {
        this.courses = this.courses.filter(
          (course) => course.id !== deletedCourse.id,
        );
        console.log({ courses: deletedCourse });
      },
      error: (error) => console.error({ error }),
    });
  }
}
