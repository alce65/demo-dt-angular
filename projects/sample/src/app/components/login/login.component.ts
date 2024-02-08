import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginData } from '../../entities/user';
import { UsersStoreService } from '../../store/users.store.service';

@Component({
  selector: 'dit-login',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usersStore = inject(UsersStoreService);
  formStructure = {
    email: {
      type: 'email',
      errors: {
        required: 'El email es obligatorio',
        email: 'El email no es válido',
      },
    },
    passwd: {
      type: 'password',
      errors: {
        required: 'La contraseña es obligatoria',
        minlength: 'La contraseña debe tener al menos 4 caracteres',
        maxlength: 'La contraseña no puede tener más de 10 caracteres',
        pattern: 'La contraseña debe tener solo letras y un números',
      },
    },
  };
  onSubmit(value: LoginData) {
    if (!value.email || !value.passwd) {
      return;
    }
    this.usersStore.login(value);
    console.log('submit', value);
  }
}
