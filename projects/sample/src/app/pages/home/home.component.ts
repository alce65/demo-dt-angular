import { Component } from '@angular/core';
import { SampleComponent } from '../../components/sample/sample.component';

import { GreetingComponent } from '../../components/greeting/greeting.component';
import { ClickerComponent } from '../../components/clicker/clicker.component';

@Component({
  selector: 'dit-home',
  standalone: true,
  imports: [SampleComponent, ClickerComponent, GreetingComponent],
  template: `
    <p>home works!</p>
    <dit-sample />
    <dit-clicker />
    <dit-greeting />
  `,
  styles: ``,
})
export default class HomeComponent {}
