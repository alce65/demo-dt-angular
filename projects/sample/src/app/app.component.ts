import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgDemoComponent } from './components/ng-demo/ng-demo.component';

@Component({
  selector: 'dit-root',
  standalone: true,
  imports: [RouterOutlet, NgDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
