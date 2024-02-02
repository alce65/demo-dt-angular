import { Component } from '@angular/core';

@Component({
  selector: 'dit-header',
  standalone: true,
  imports: [],
  template: `
    <header>
      <h1>
        {{ tittle }}
      </h1>
      <ng-content></ng-content>
    </header>
  `,
  styles: `
    :host {
      background-color: var(--primary-color);
      color: var(--secondary-color);
      display: flex;
      flex-direction: column;
    }

    header {
      padding-inline: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
      display: flex;
      gap: 1rem;
    }
  `,
})
export class HeaderComponent {
  tittle = 'Learning Angular';
}
