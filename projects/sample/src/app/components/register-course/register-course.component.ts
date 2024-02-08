import { JsonPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'dit-register-course',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './register-course.component.html',
  styleUrl: './register-course.component.css',
})
export class RegisterCourseComponent implements OnInit {
  @ViewChild('formRef', { static: true }) formRef!: ElementRef<HTMLFormElement>;
  @ViewChild('ngFormRef', { static: true }) ngFormRef!: NgForm;

  formStructure = {
    firstName: {
      type: 'text',
      errors: {
        required: 'El nombre del usuario es obligatorio',
      },
    },
    surname: {
      type: 'text',
      errors: {
        required: 'El apellido del usuario es obligatorio',
      },
    },
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
    countries: {
      type: 'select',
      options: [
        { id: 'es', label: 'España' },
        { id: 'fr', label: 'Francia' },
        { id: 'pt', label: 'Portugal' },
        { id: 'o', label: 'Otros' },
      ],
      errors: {
        required: 'El país es obligatorio',
      },
    },
    gender: {
      type: 'radio',
      options: [
        { id: 'M', label: 'Masculino' },
        { id: 'F', label: 'Femenino' },
        { id: 'O', label: 'Otro' },
        { id: 'ND', label: 'No definido' },
      ],
      errors: {
        required: 'Algún valor, aunque sea "No definido" es obligatorio',
      },
    },
    comments: {
      type: 'textarea',
    },
    isOkTerms: {
      type: 'checkbox',
      errors: {
        required: 'Debe aceptar los términos y condiciones',
      },
    },
  };

  ngOnInit(): void {
    console.log('formRef', this.formRef.nativeElement);
    console.log('ngFormRef', this.ngFormRef);
  }

  onSubmit() {
    console.log('submit', this.ngFormRef.value);
  }
}
