import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Course, DataCourse } from '../entities/course';
import { Repo } from '../types/repo';
import { StorageService } from './storage.service';
import { COURSES } from './courses.memory.repo.service';

const storeName = 'courses';

const STORAGE_TOKEN = new InjectionToken<StorageService<Course[]>>(
  'Storage Service',
  {
    providedIn: 'root',
    factory: () => new StorageService<Course[]>(storeName),
  },
);

@Injectable({
  providedIn: 'root',
})
export class CoursesLocalRepoService implements Repo<Course> {
  courses: Course[] = [];
  constructor(
    @Inject(STORAGE_TOKEN) private storage: StorageService<Course[]>,
  ) {
    let data = this.storage.getItem();
    if (data === null) {
      data = COURSES;
      this.storage.setItem(data);
    }
    this.courses = data;
  }

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
    this.storage.setItem(this.courses);
    return this.courses;
  }

  async update(
    id: string | number,
    updatedItem: Partial<Course>,
  ): Promise<Course[]> {
    this.courses = this.courses.map((course) =>
      course.id === updatedItem.id ? { ...course, ...updatedItem } : course,
    );
    this.storage.setItem(this.courses);
    return this.courses;
  }

  async delete(id: string | number): Promise<Course[]> {
    this.courses = this.courses.filter((course) => course.id !== id);
    this.storage.setItem(this.courses);
    return this.courses;
  }
}
