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
  styles: ``,
})
export class FooterComponent {
  brand = 'ISDI - DigiTech';
  today = new Date();
}
