import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'dit-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  template: `
    <dit-header>
      <ng-content select=".menu"></ng-content>
    </dit-header>
    <ng-content select=".main"></ng-content>
    <dit-footer></dit-footer>
  `,
  styles: ``,
})
export class LayoutComponent {}
