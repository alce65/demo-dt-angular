# Formación DigiTech

Desarrollo Web FullStack
Tecnologías a enseñar:

- Front
  - TypeScript (Inicial)
  - Angular (Inicial)
  - React (Opcional)
- BackEnd
  - NodeJS (Opcional)
  - MongoDB (Opcional)

Previos

- Web: Arquitectura cliente/servidor
- Herramientas y entorno
  - Git / Github
  - Node
  - VSC

17:30 [19:05 - 19:15] - 20:30

## Creación del proyecto

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.6.

```shell
ng new demo-dt --create-application false
cd demo-dt
ng g app sample --ssr false --style css -p isdi

// ng g lib isdi-core --standalone -p isdi
```

## Incorporación de Linters

### ESLint

```shell
ng add @angular-eslint/schematics
```

El resultado será el siguiente

```shell
CREATE .eslintrc.json (993 bytes)
CREATE projects/sample/.eslintrc.json (647 bytes)
UPDATE package.json (1420 bytes)
UPDATE angular.json (3255 bytes)
```

### Prettier

Para que la extensión de Prettier en VSC utilice la última versión de Prettier,
capaz de formatear correctamente las nuevas estructuras de control de flujo de Angular,
hay que instalarla como dependencia (de desarrollo) del proyecto

```shell
  npm i -D prettier
```

Además es necesario que el formateador de HTML definido en los settings de VSC sea Prettier

```json
 "[html]": {
    // "editor.defaultFormatter": "vscode.html-language-features",
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "files.insertFinalNewline": true
  },
```

## Primera aproximación a Angular

### Revisión del Scaffolding resultante

#### El workspace

Gitignore, Editorconfig  y README inicial

- demo-dt/.editorconfig (274 bytes)
- demo-dt/.gitignore (548 bytes)
- demo-dt/README.md (1065 bytes)

Fichero de VSC

- demo-dt/.vscode/extensions.json (130 bytes)
- demo-dt/.vscode/launch.json (470 bytes)
- demo-dt/.vscode/tasks.json (938 bytes)

Ficheros de configuración

- .eslintrc.json (993 bytes)
- demo-dt/package.json (996 bytes)
- demo-dt/tsconfig.json (903 bytes)
- demo-dt/angular.json (139 bytes)

#### El proyecto de tipo aplicación

Ficheros de configuración actualizados

- UPDATE angular.json (2992 bytes)
- UPDATE package.json (1044 bytes)

La carpeta del proyecto: Ficheros de configuración

- projects/demo/tsconfig.app.json (285 bytes)
- projects/demo/tsconfig.spec.json (295 bytes)
- projects/demo/.eslintrc.json (647 bytes)

La carpeta sources (src): Ficheros globales en la raíz del proyecto

- projects/demo/src/main.ts (256 bytes)
- projects/demo/src/favicon.ico (15086 bytes)
- projects/demo/src/index.html (308 bytes)
- projects/demo/src/styles.scss (81 bytes)

La carpeta app: configuración del bootstrap y las rutas

- projects/demo/src/app/app.config.ts (235 bytes)
- projects/demo/src/app/app.routes.ts (80 bytes)

La carpeta app: el componente principal (app)

- projects/demo/src/app/app.component.html (21220 bytes)
- projects/demo/src/app/app.component.spec.ts (951 bytes)
- projects/demo/src/app/app.component.ts (382 bytes)
- projects/demo/src/app/app.component.scss (0 bytes)

La carpeta assets preparada

- projects/demo/src/assets/.gitkeep (0 bytes)

#### El proceso de arranque (bootstrap) de la aplicación

En projects/demo/src/ están los ficheros responsables de que exista la aplicación

```schema
index.html + styles.scss
   (definido en angular.json)
          ┕━━━━━━━> main.ts
                    (bootstrap with)
                      ┝━━━━━━━>  app.config.ts
                      ┃                ┕━━━━━━━> rutas desde app.routes.ts
                      ┕━━━━━━━> app.component.ts
                                       ┝━━━━━━━━> app.component.html
                                       ┕━━━━━━━━> app.component.scss
```

### Revisión de las operaciones básicas con el CLI (1): scaffolding y server

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The application will automatically reload if you change any of the source files.

Estando activo ng serve comprobamos como se refleja un cambio e.g. el valor del titulo almacenado en app.component

#### Code scaffolding

Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Generamos un componente sample en la carpeta components (también se generara)

```shell
ng g c components/sample --dry-run
```

Nos llevamos al nuevo componente todo el ejemplo que viene con angular:

- template HTML
- estilos, desde el HTML al fichero de estilos
- propiedades de la clase
- elementos del test

Utilizamos el nuevo componente desde app

- lo importamos
- lo consumimos en el template de app

### COMPONENTE (Review)

- Clase + decorador
- template (html + elementos de Angular)
- estilos (css, scss, sass...)

### Revisión de las operaciones básicas con el CLI (2): build y test

#### Build

Run `ng build` to build the project.
The build artifacts will be stored in the `dist/` directory.

Se crea la carpeta dist/demo/browser

favicon.ico
index.html

Los resultados de la compilación por parte de esbuild

main-FMCIX442.js      | main          | 191.64 kB |                52.66 kB
polyfills-RX4V3J3S.js | polyfills     |  33.01 kB |                10.68 kB
styles-5INURTSO.css   | styles        |   0 bytes |                 0 bytes

Este contenido es el que aparecerá en el server donde hagamos es despliegue de la aplicación (Vercel, Netlify...)

Podemos probarlo localmente, e.g. con LiveServer desde linea de comandos, si lo tenemos instalado global

```shell
npm list -g
npm i -g live-server
```

#### Running tests unitarios

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

El test de componente fallará hemos cambiado un valor en una propiedad sin reflejarlo en el test.
lo corregimos y observamos la estructura de los test

## Páginas y Routing: lazy loading en las rutas

### Creación de componentes pages

NO existen como tal las páginas
Podemos llamar así a los componentes invocados directamente en las rutas y usarlos como contenedores
podemos crearlos con el modo inline para el template (-t) y para los estilos (-s)

```shell
ng g c pages/home -t -s  --skip-selector --dry-run
```

Modificamos nuestro componente para incluir propiedades y su interpolación en el template

```ts
@Component({
  selector: "isdi-home",
  standalone: true,
  imports: [],
  template: `<h2>{{ title }}</h2>`,
  styles: ``,
})
export class HomeComponent {
  title = "Home page";
}
```

### Rutas

En el fichero de rutas, añadimos las páginas incluyendo las re-direcciones para la url vacía o cualquier error

```ts
export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "**", redirectTo: "home" },
];
```

Comprobamos su funcionamiento escribiendo directamente las rutas en el navegador

El componente sample lo reubicamos en la página about
Vemos que para usar un componente es necesario **importarlo en los metadata** del otro

### Rutas lazy

Cambiamos las rutas para que carguen la páginas de formaa lazy o diferida:
en el momento en el que son requeridas por primera vez

Para ello angular usa los import dinámicos soportados por el actual estándar de ES

El objeto Route disponía de la propiedad loadChildren, para referirse a los módulos en carga lazy;
en las últimas versiones se añade la propiedad **loadComponent**, con la misma funcionalidad para los componentes

Nos aseguramos de no importar los componentes de forma estática

```ts
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((c) => c.AboutComponent),
  },
  { path: '**', redirectTo: 'home' },
```

### Menu: navegación sin recarga para una SPA

Creamos un componente menu

```shell
ng g c components/menu
```

Lo incorporamos en app.component, antes del router outlet

Para poder usar directicas de routing es necesario que el componente importe de Angular
el módulo responsable de esta funcionalidad, RoutingModule

```ts
@Component({
  selector: "isdi-menu",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.scss",
})
export class MenuComponent {}
```

De esa forma, el template puede definir el comportamiento de los hiperenlaces como una navegación SPA

```html
<a [routerLink]="'home'" routerLinkActive="link-active">Home</a>
```

Si incluimos la clase CSS en los estilos, se aplicara automáticamente en el elemento del menu que esté activo

```scss
nav {
  ul {
    list-style: none;
    display: flex;
    li {
      display: block;
      padding: 0.2rem 0.5rem;
      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }
}

.link-active {
  font-weight: 500;
  font-size: 1.1rem;
  position: relative;
  top: -2px;
  transition: font-weight 2s;
  border-bottom: 1px solid;
}
```

## Componentes: estado y binding. Eventos. Templates y control flow. Estilos

### Opciones del menu como propiedad: uso de @for

Creamos un interface con el CLI

```shell
  ng g i interfaces/menu.option
```

Definimos en el el objeto que representa una ruta (path y label)

```ts
export interface MenuOption {
  path: string;
  label: string;
}
```

Añadimos en el componente menu una propiedad con el array de opciones del menu

```ts
  options: MenuOption[] = [
    { path: 'home', label: 'Home' },
    { path: 'about', label: 'Acerca de' },
  ];
```

En el template iteramos sobre esa propiedad para construir el menu

```html
@for (option of options; track $index) {
<li><a [routerLink]="option.path" routerLinkActive="link-active">{{option.label}}</a></li>
}
```

Estamos usando una de las nuevas flow controls, que sustituyen a las directivas estructurales en Angular 17

Al mismo tiempo vemos las dos formas de incorporar expresiones de ES en los templates de Angular

- como atributos de los componentes: []
- como interpolaciones en el contenido: {{}}

### Componente contador: estado y eventos

Creamos un componente contador y lo añadimos en la página home

```shell
  ng g c components/counter
```

- Cualquier propiedad de la clase es en si un estado: sus cambios se reflejan en la vista
- En la vista podemos definir la respuesta a los eventos con el operador ()
- En esa respuesta podemos hacer directamente cambios en el estado, que automáticamente actualizaran la vista

```html
<button type="button" (click)="counter =  counter - 1">➖</button>
<span>{{counter}}</span>
<button type="button" (click)="counter =  counter + 1">➕</button>
```

Sería mucho mejor práctica llevar la lógica a un método manejador del evento click

```ts
  updateCounter(value: number) {
    this.counter = this.counter + value;
  }
```

### Uso condicional de clases CSS

La directiva ngClass es un ejemplo de las directivas de atributo
Para usar las directivas en un componente es necesario importar en él CommonModule

NgClass se puede usar de varias maneras.
La más potente es vincularla con un objeto con la directiva en el que

- los nombres de las propiedades corresponden a clases CSS
- su valor boolean determina si se aplican o no

```html
<span [ngClass]="{'negative': counter < 0}">{{counter}}</span>
```

### Limites en el contador: renderizado condicional

Si definimos como límites -10 y 10, podemos deshabilitar el botón que ya no es valido dando al atributo disable un valor booleano.
Vemos de nuevo como el operador [] permite vincular un atributo a una expresión

```html
<button type="button" (click)="updateCounter(-1)" [disabled]="counter === -10">➖</button>
<span [ngClass]="{negative: counter < 0}">{{counter}}</span>
<button type="button" (click)="updateCounter(+1)" [disabled]="counter === 10">➕</button>
```

Pero ademas, podemos añadir información al usuario que se renderizará condicionalmente
Para ello tenemos también un nuevo flow control, @if, que viene a sustituir a la directiva estructural nf-if

```html
@if (counter === 10) {
<p class="info">has alcanzado el límite superior</p>
} @else if (counter === -10) {
<p class="info">has alcanzado el límite inferior</p>
```

### Componente saludo: two-way data binding with ngModel

Creamos un componente saludo y lo añadimos en la página home

```shell
  ng g c components/greeting
```

Añadimos un input de HTML y vemos como vincularlo a una propiedad,
de forma similar a lo que hacemos en los formularios controlados de react

```html
<input type="text" placeholder="Dime tu nombre" [value]="user" (input)="updateInput($event)" />
```

```ts
 updateInput(event: Event) {
    this.user = (event.target! as HTMLInputElement).value as string;
  }
```

El value del input se iguala a la propiedad del componente
En respuesta al evento input, se actualiza la propiedad con el valor del input

Podemos añadir un botón de borrado, que elimina el valor de la propiedad
reflejándose en el template, incluso en el valor del input

```ts
  cleanInputUser() {
    this.user = '';
  }
```

De esta forma se consigue el binding bidireccional (two-way data binding)
entre la vista (template) y el componente

Además, Angular proporciona una directiva de atributo, **ngModel**,
junto con su evento específico **ngModelChange** que permiten reescribir el código de forma mas simple

Para usarla debemos importar formsModule en nuestro componente

```html
<input type="text" placeholder="El nombre de tu mascota" [ngModel]="pet" (ngModelChange)="pet = $event" />
```

Finalmente, la referencia a la directiva y su método puede unificarse con el operador [()] con ngModel.
Así es como usaremos siempre el binding bidireccional

```html
<input type="text" placeholder="Y de donde eres" [(ngModel)]="place" />
```

### Los estilos y los componentes

El fichero de estilos src/styles define los estilos generales.

En el podemos colocar las variables que teníamos en el componente sample o las propiedades de main

La etiqueta main la pasamos a app.component, quitándola de sample, ya que solo puede ser usada una vez.

Como vemos, el css se sigue aplicando, ya que esta en el fichero global, no vinculado a ningún componente.

En el componente sample sigue existiendo la etiqueta **:host**, auto-referencia al propio componente

```scss
:host {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: relative;
}
```

Para comprobar la encapsulación de los estilos, vamos al componente counter y
aplicamos el estilo al párrafo de mensaje directamente en la etiqueta p, sin usar clases

Los párrafos de otros componente no se ven afectados

Creamos un componente mensaje para incluirlo en counter y ver que pasa con el css en un componente hijo

```shell
  ng g c components/message
```

Tampoco le afecta el css del componente: los estilos están encapsulados en su componente

Podemos ver en el inspector de las developer Tools como se consigue esto aplicando los estilos
junto con atributos en forma de hash creados por Angular durante la compilación

Este comportamiento puede modificarse con el metadato **encapsulation** al que podemos asignar el valor **ViewEncapsulation.None**


