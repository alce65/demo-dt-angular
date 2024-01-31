import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dit-greeting',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>greeting</h2>
    <p>Hola {{ userName ? userName : 'amigo' }}</p>
    <label>
      <input
        type="text"
        name="user-name"
        placeholder="Dime tu nombre"
        [(ngModel)]="userName"
      />
    </label>
    <button type="button" (click)="onDelete()">Borrar</button>
  `,
  styles: ``,
})
export class GreetingComponent {
  userName = 'Pepe';

  onDelete() {
    this.userName = '';
  }
}
