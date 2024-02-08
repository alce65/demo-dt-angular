import { Component } from '@angular/core';
import { SampleComponent } from '../../components/sample/sample.component';

import { GreetingComponent } from '../../components/greeting/greeting.component';
import { ClickerComponent } from '../../components/clicker/clicker.component';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'dit-home',
  standalone: true,
  imports: [
    SampleComponent,
    LoginComponent,
    ClickerComponent,
    GreetingComponent,
  ],
  template: `
    <p>home works!</p>
    <dit-sample />
    <dit-login />
    <dit-clicker />
    <dit-greeting />
  `,
  styles: `
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
  }`,
})
export default class HomeComponent {}
