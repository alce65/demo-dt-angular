import { Component } from '@angular/core';
import { SampleComponent } from '../../components/sample/sample.component';
import { CounterComponent } from '../../components/counter/counter.component';
import { GreetingComponent } from '../../components/greeting/greeting.component';

@Component({
  selector: 'dit-home',
  standalone: true,
  imports: [SampleComponent, CounterComponent, GreetingComponent],
  template: `
    <p>home works!</p>
    <dit-sample />
    <dit-counter />
    <dit-greeting />
  `,
  styles: ``,
})
export default class HomeComponent {}
