import { Component } from '@angular/core';
import { NgDemoComponent } from '../../components/ng-demo/ng-demo.component';

@Component({
  selector: 'dit-about',
  standalone: true,
  imports: [NgDemoComponent],
  template: `
    <h2>about works!</h2>
    <dit-ng-demo></dit-ng-demo>
  `,
  styles: ``,
})
export default class AboutComponent {}
