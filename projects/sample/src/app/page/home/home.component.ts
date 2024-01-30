import { Component } from '@angular/core';
import { SampleComponent } from '../../components/sample/sample.component';

@Component({
  selector: 'dit-home',
  standalone: true,
  imports: [SampleComponent],
  template: `
    <p>home works!</p>
    <dit-sample></dit-sample>
  `,
  styles: ``,
})
export default class HomeComponent {}
