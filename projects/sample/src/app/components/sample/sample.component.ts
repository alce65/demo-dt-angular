import { Component } from '@angular/core';

@Component({
  selector: 'dit-sample',
  standalone: true,
  imports: [],
  // templateUrl: './sample.component.html',
  template: `
    <h1>{{ title }}</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste vero sint
      quam rerum necessitatibus odio atque expedita illo natus temporibus
      nesciunt commodi doloremque hic, vel facere pariatur blanditiis omnis
      voluptatum!
    </p>
  `,
  // styleUrl: './sample.component.css',
  styles: [
    `
      :host {
        display: block;
        padding: 1rem;
        border: 2px solid #a28b8b;
        margin: 1rem 0;
        width: 50%;
        min-width: 300px;
      }
    `,
  ],
})
export class SampleComponent {
  // Controller
  title = 'Sample Component';
}
