import { Injectable } from '@angular/core';
import { LoginData, User, UserData } from '../entities/user';
import { of } from 'rxjs';

const USERS: (UserData & { passwd: string })[] = [
  {
    id: crypto.randomUUID(),
    email: 'pepe@sample.com',
    passwd: '12345',
    firstName: 'Pepe',
    surname: 'Perez',
    country: 'Spain',
    gender: 'Masculino',
    birthDateIso: '1980-01-01',
    role: 'user',
    bio: 'Mi vida es una aventura',
    termsAcceptance: true,
    token: '12345-token',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UsersMemoryRepoService {
  users = USERS;
  login(loginData: LoginData) {
    const foundUser = this.users.find(
      (u) => u.email === loginData.email && u.passwd === loginData.passwd,
    );
    if (!foundUser) {
      throw new Error('User not valid');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwd, ...userData } = foundUser;
    const { token, birthDateIso, ...userDataClean } = userData;
    const user: User = {
      ...userDataClean,
      birthDate: new Date(birthDateIso),
    };
    return of({ user, token });
  }
}
