import { Component } from '@angular/core';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'dit-clicker',
  standalone: true,
  imports: [CounterComponent],
  template: `
    <h2>Clicker</h2>
    <p>clicks: {{ clickCount }} - total: {{ total }}</p>
    <dit-counter [index]="1" (eventClick)="onEventClick($event)"></dit-counter>
    <dit-counter [index]="2" (eventClick)="onEventClick($event)"></dit-counter>
  `,
  styles: ``,
})
export class ClickerComponent {
  clickCount = 0;
  total = 0;

  onEventClick(value: number) {
    this.clickCount++;
    this.total += value;
  }
}
