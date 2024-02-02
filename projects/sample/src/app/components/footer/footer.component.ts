import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'dit-footer',
  standalone: true,
  imports: [DatePipe],
  template: `
    <footer>
      <address>{{ brand }} &copy; {{ today | date: 'fullDate' }}</address>
    </footer>
  `,
  styles: `
    :host {
      background-color: var(--primary-color);
      color: var(--secondary-color);
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 10vh;
    }

    footer {
      display: flex;
      justify-content: center;
    }
  `,
})
export class FooterComponent {
  brand = 'ISDI - DigiTech';
  today = new Date();
}
