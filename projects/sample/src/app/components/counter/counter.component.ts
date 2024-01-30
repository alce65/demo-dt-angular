import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'dit-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>counter</h2>
    <p>
      <button (click)="onClick(-1)" [disabled]="count <= -10">-</button>

      count:
      <span [ngClass]="{ negative: count < 0 }" class="">{{ count }} </span>
      <button (click)="onClick(1)" [disabled]="count >= 10">+</button>
    </p>
    @if (count === 10) {
      <p>No puedes contar más de 10</p>
    } @else if (count === -10) {
      <p>No puedes contar menos de -10</p>
    }
  `,
  styles: `
  p {
    display: flex;
    gap: 1rem;
  }
  .negative {
    color: red;
  }
  `,
})
export class CounterComponent {
  count = 0;

  onClick(value: number) {
    this.count += value;
  }
}
