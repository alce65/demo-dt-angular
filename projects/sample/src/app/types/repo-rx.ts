import { Observable } from 'rxjs';

export interface RepoRx<T extends { id: string | number }> {
  getAll(): Observable<T[]>;
  getById(id: string): Observable<T>;
  add(newItem: Partial<T>): Observable<T>;
  update(id: T['id'], updatedItem: Partial<T>): Observable<T>;
  delete(id: T['id']): Observable<T>;
}
