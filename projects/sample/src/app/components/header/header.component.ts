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
  styles: ``,
})
export class HeaderComponent {
  tittle = 'Learning Angular';
}
