import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginData, User } from '../entities/user';
import { UsersMemoryRepoService } from '../services/users.memory.repo.service';

type UserErrors = {
  login: string;
  // register: string;
  // update: string;
  // delete: string;
};

export type UserState = {
  currentUser: Observable<User | null>;
  token: Observable<string>;
  errors: Observable<UserErrors>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialState: {
  currentUser: User | null;
  token: string;
  errors: UserErrors;
} = {
  currentUser: null,
  token: '',
  errors: { login: '' },
};

@Injectable({
  providedIn: 'root',
})
export class UsersStoreService {
  private currentUser$ = new BehaviorSubject(initialState.currentUser);
  private token$ = new BehaviorSubject(initialState.token);
  private errors$ = new BehaviorSubject(initialState.errors);

  private repo = inject(UsersMemoryRepoService);

  getState() {
    const state: UserState = {
      currentUser: this.currentUser$.asObservable(),
      token: this.token$.asObservable(),
      errors: this.errors$.asObservable(),
    };
    return state;
  }

  setNoErrors() {
    this.errors$.next({ ...initialState.errors });
  }

  login(loginData: LoginData) {
    this.repo.login(loginData).subscribe({
      next: ({ user, token }) => {
        this.currentUser$.next(user);
        this.token$.next(token);
      },
      error: (error: Error) => {
        this.errors$.next({ login: error.message });
      },
    });
  }
}
