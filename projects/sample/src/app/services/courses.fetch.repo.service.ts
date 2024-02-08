/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Repo } from '../types/repo';
import { Course, DataCourse } from '../entities/course';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CoursesFetchRepoService implements Repo<Course> {
  endpoint = 'courses';
  urlApi = new URL(this.endpoint, environment.urlBaseApi).toString();

  constructor() {}

  getAll(): Promise<Course[]> {
    return fetch(this.urlApi).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response ${response.status} ${response.statusText}`,
        );
      }
      return response.json() as Promise<Course[]>;
    });
  }
  getById(id: string): Promise<Course[]> {
    const url = this.urlApi + '/' + id.toString();
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response ${response.status} ${response.statusText}`,
        );
      }
      return response.json().then((course) => [course] as Course[]);
    });
  }

  add(data: DataCourse): Promise<Course[]> {
    const course: Course = {
      ...data,
      id: crypto.randomUUID(),
      isDone: false,
    } as Course;
    return fetch(this.urlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response ${response.status} ${response.statusText}`,
        );
      }
      return response.json().then((course) => {
        return [course] as Course[];
      });
    });
  }

  update(id: string | number, updatedItem: Partial<Course>): Promise<Course[]> {
    const url = new URL(id.toString(), this.urlApi).toString();
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response ${response.status} ${response.statusText}`,
        );
      }
      return response.json().then((course) => {
        return [course] as Course[];
      });
    });
  }

  delete(id: string | number): Promise<Course[]> {
    const url = this.urlApi + '/' + id.toString();
    return fetch(url, {
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response ${response.status} ${response.statusText}`,
        );
      }
      return response.json().then((course) => {
        return [course] as Course[];
      });
    });
  }
}
