import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuOption } from './types/menu.option';

@Component({
  selector: 'dit-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  menuOptions: MenuOption[] = [
    { label: 'Inicio', path: 'home' },
    { label: 'Tareas', path: 'todo' },
    { label: 'Acerca de', path: 'about' },
  ];
}
