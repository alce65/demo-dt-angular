import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService<T> {
  constructor(@Inject('key') private key: string) {}

  getItem(): T | null {
    const item = localStorage.getItem(this.key);
    return item ? JSON.parse(item) : null;
  }

  setItem(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  removeItem() {
    localStorage.removeItem(this.key);
  }
}
