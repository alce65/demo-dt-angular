import { Component, inject } from '@angular/core';
import { UsersStoreService } from '../../store/users.store.service';
import { User } from '../../entities/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'dit-sample',
  standalone: true,
  imports: [DatePipe],
  // templateUrl: './sample.component.html',
  template: `
    <h1>{{ title }}</h1>
    @if (!user) {
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste vero sint
        quam rerum necessitatibus odio atque expedita illo natus temporibus
        nesciunt commodi doloremque hic, vel facere pariatur blanditiis omnis
        voluptatum!
      </p>
    } @else {
      <p>
        {{ user.firstName }} {{ user.surname }} es un usuario de tipo
        {{ user.role }} y nació el {{ user.birthDate | date: 'dd/MM/yyyy' }} en
        {{ user.country }}
      </p>
    }
  `,
  // styleUrl: './sample.component.css',
  styles: [
    `
      :host {
        display: block;
        padding: 1rem;
        border: 2px solid #a28b8b;
        margin: 1rem 0;
        width: 50%;
        min-width: 300px;
      }
    `,
  ],
})
export class SampleComponent {
  // Controller
  title = 'Sample Component';
  usersStore = inject(UsersStoreService);
  user: User | null = null;
  constructor() {
    //console.log('usersStore', this.usersStore);
    this.usersStore.getState().currentUser.subscribe((user) => {
      this.user = user;
    });
  }
}
