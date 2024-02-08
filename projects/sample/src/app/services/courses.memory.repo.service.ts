/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Repo } from '../types/repo';
import { Course, DataCourse } from '../entities/course';

export const COURSES: Course[] = [
  { id: crypto.randomUUID(), title: 'Course 1', author: 'Pepe', isDone: true },
  { id: crypto.randomUUID(), title: 'Course 2', author: 'Juan', isDone: false },
  { id: crypto.randomUUID(), title: 'Course 3', author: 'Rosa', isDone: false },
];

@Injectable({
  providedIn: 'root',
})
export class CoursesMemoryRepoService implements Repo<Course> {
  courses: Course[] = COURSES;

  constructor() {}

  async getAll(): Promise<Course[]> {
    return this.courses;
  }

  async getById(id: string): Promise<Course[]> {
    return this.courses.filter((course) => course.id === id);
  }

  async add(data: DataCourse): Promise<Course[]> {
    const course: Course = {
      ...data,
      id: crypto.randomUUID(),
      isDone: false,
    };
    this.courses = [...this.courses, course];
    return this.courses;
  }

  async update(
    id: string | number,
    updatedItem: Partial<Course>,
  ): Promise<Course[]> {
    this.courses = this.courses.map((course) =>
      course.id === updatedItem.id ? { ...course, ...updatedItem } : course,
    );
    return this.courses;
  }

  async delete(id: string | number): Promise<Course[]> {
    this.courses = this.courses.filter((course) => course.id !== id);
    return this.courses;
  }
}
