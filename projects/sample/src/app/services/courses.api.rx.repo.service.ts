/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RepoRx } from '../types/repo-rx';
import { Course } from '../entities/course';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CoursesApiRxRepoService implements RepoRx<Course> {
  endpoint = 'courses';
  urlApi = new URL(this.endpoint, environment.urlBaseApi).toString();

  private http = inject(HttpClient);
  // constructor(private http: HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.urlApi).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;
        if (errorResponse.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          // errorResponse.error contiene la información del error
          errorMessage = `Se ha producido un error interno ${errorResponse.error}`;
          // console.error(errorMessage);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          errorMessage = `El Backend ha devuelto un código ${errorResponse.status} con el mensaje ${errorResponse.error}`;
          // console.error(errorMessage);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
  getById(id: string): Observable<Course> {
    const url = this.urlApi + '/' + id.toString();
    return this.http.get<Course>(url).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;
        if (errorResponse.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          // errorResponse.error contiene la información del error
          errorMessage = `Se ha producido un error interno ${errorResponse.error}`;
          // console.error(errorMessage);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          errorMessage = `El Backend ha devuelto un código ${errorResponse.status} con el mensaje ${errorResponse.error}`;
          // console.error(errorMessage);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  add(newItem: Partial<Course>): Observable<Course> {
    const course: Course = {
      ...newItem,
      id: crypto.randomUUID(),
      isDone: false,
    } as Course;
    return this.http.post<Course>(this.urlApi, course).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;
        if (errorResponse.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          // errorResponse.error contiene la información del error
          errorMessage = `Se ha producido un error interno ${errorResponse.error}`;
          // console.error(errorMessage);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          errorMessage = `El Backend ha devuelto un código ${errorResponse.status} con el mensaje ${errorResponse.error}`;
          // console.error(errorMessage);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  update(
    id: string | number,
    updatedItem: Partial<Course>,
  ): Observable<Course> {
    const url = this.urlApi + '/' + id.toString();
    return this.http.patch<Course>(url, updatedItem).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;
        if (errorResponse.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          // errorResponse.error contiene la información del error
          errorMessage = `Se ha producido un error interno ${errorResponse.error}`;
          // console.error(errorMessage);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          errorMessage = `El Backend ha devuelto un código ${errorResponse.status} con el mensaje ${errorResponse.error}`;
          // console.error(errorMessage);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  delete(id: string | number): Observable<Course> {
    const url = this.urlApi + '/' + id.toString();
    return this.http.delete<Course>(url).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;
        if (errorResponse.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          // errorResponse.error contiene la información del error
          errorMessage = `Se ha producido un error interno ${errorResponse.error}`;
          // console.error(errorMessage);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          errorMessage = `El Backend ha devuelto un código ${errorResponse.status} con el mensaje ${errorResponse.error}`;
          // console.error(errorMessage);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
