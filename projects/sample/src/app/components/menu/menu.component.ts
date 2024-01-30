import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dit-menu',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <ul>
        <li>
          <a [routerLink]="'home'" routerLinkActive="link-active">Inicio</a>
        </li>
        <li>
          <a [routerLink]="'about'" routerLinkActive="link-active">Acerca de</a>
        </li>
      </ul>
    </nav>
  `,
  styles: `
    nav {
      ul {
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0;
        gap: 1rem
      }
      li {
        display: block;
        padding: 0.2rem 0.5rem;
        a {
          text-decoration: none;
          color: inherit;
        }
      }
    }
    .link-active {
      color: maroon;
      font-weight: 700;
      font-size: 1.1rem;
      position: relative;
      top: -2px;
      transition: font-weight 2s;
      border-bottom: 1px solid;
    }
    `,
})
export class MenuComponent {}
