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

## **Angular - Dia 1 (29-Enero)**

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

## **Angular - Día 2 (30-Enero)**

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

Cambiamos las rutas para que carguen la páginas de forma lazy o diferida:
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

Para poder usar directivas de routing es necesario que el componente importe de Angular
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

## **Angular - Día 3 (31-Enero)**

## Organización carpetas... Scaffolding

src/app

### Estructural

src/app
  /pages
  /components
  /types
  /services

### Features

src/app
  /core
    /components
    /types
    /services
  /home
    /pages
    /components
    /types
    /services
  /products
    /pages
    /components
    /types
    /services
  /partners
    /pages
    /components
    /types
    /services

## Proyección del contenido

### Componentes header y footer

Añadimos los clásicos componentes header y footer.
Como en otros componentes podríamos optar por hacer inline template (-t) y estilos (-s)
o por prescindir de la carpeta para el componente (--flat)

```shell
  ng g c components/header -t -s --dry-run
```

En nuestro caso, los dejamos con el estilo que venimos usando en la aplicación

```shell
  ng g c components/header -t -s
  ng g c components/footer -t -s
```

### Componente layout: proyección de componentes

En lugar de exportar header y footer podemos crear un componente layout

```shell
  ng g c components/layout --project core
```

En el consumiremos header y footer dejando un espacio para todo el contenido que envuelva el componente

Para indicar donde se colocará el contenido utilizamos la directiva ngContent

```html
<isdi-header></isdi-header>

<ng-content></ng-content>

<isdi-footer></isdi-footer>
```

Para poder usar el nuevo componentes lo añadimos al API de la librería (public-api.ts).
Al mismo tiempo dejamos de exportar header y footer

Al consumir el componente en la aplicación es un wrapper que envuelve todo el contenido que se va a proyectar dentro de el

```html
<isdi-layout>
  <isdi-menu></isdi-menu>
  <main class="main">
    <router-outlet></router-outlet>
  </main>
</isdi-layout>
```

## Comunicación entre componentes

En Angular es bidireccional pero asimétrica

- hacia abajo: paso de parámetros a los hijos
- hacia arriba: envío de eventos hacia el padre

### Inputs: paso de parámetros a los hijos

Se basa en el decorador **@Input()** que incorpora una propiedad al 'interface' del componente, como si fuera un atributo html, que puede recibir valores cuando se consume el componente, ed decir en el padre.

El resultado es muy similar a las props de React

Como ejemplo, podemos refactorizar el componente menu y como lo consume app,
llevándonos la definición de las opciones del menú hasta app

El componte hijo define sus atributos

```ts
export class MenuComponent {
  @Input() options: MenuOption[] = [];
}
```

El componente padre proporciona valores a esos atributos, accediendo a ellos con el operador [], igual que a los atributos html

```ts
@Component({
  ...
})
export class AppComponent {
  menuOptions: MenuOption[] = [
    { path: 'home', label: 'Home' },
    { path: 'works', label: 'Works' },
    { path: 'about', label: 'Acerca de' },
  ];
}
```

```html
<isdi-menu class="menu" [options]="menuOptions"></isdi-menu>
```

### Outputs: eventos hacia el padre

Se basa en dos elementos:

- el decorador **@Output()**, peu permite dirigir eventos hacia el nivel anterior (padre)
- la clase **EventEmitter** que permite crear y emitir eventos con cualquier contenido

Para verlo, crearemos un componente clickers que contendrá varios contadores y
totalizara el número de clicks y el valor total en el conjunto de ellos,

```shell
  ng g c components/clickers --project demo
```

Sustituiremos con el nuevo componente el counter que ahora tenemos en la página home
Y tendremos 2 contadores que funciona independientemente

El componente contador, cuando cuando se hace click emitirá un evento con el valor que acumula.
Para ello dispone en el eventEmitter del método next() o su alias emit()
El primer nombre nos indica que en realidad se trata de un observable

```ts
  @Output() countEvent: EventEmitter<number>

  constructor() {
    this.countEvent = new EventEmitter()
  }

  updateCounter(value: number) {
    this.counter = this.counter + value;
    // this.countEvent.emit(value)
    this.countEvent.next(value);
  }
```

El componente clickers estará escuchando (listener) los eventos countEvent como lo haría con cualquier otro evento

```html
  <isdi-counter (countEvent)="handleCounter($event)" />
  <isdi-counter (countEvent)="handleCounter($event)" />
```

Y en el correspondiente manejador aplicara la lógica necesaria al caso

```ts
  handleCounter(value: number) {
    this.clicks += 1;
    this.collected += value;
  }
```

### Página TODO. Componente 'TODO List' unitario

Crea una lista de tareas en un solo componente
Las tareas estarán en un array en el propio componente
Se ajustaran a un modelo o entidad:  id - titulo - isComplete
El id sera generado con crypto
Se podrá cambiar el estado de la tarea de completa a incompleta
Se podrá cambiar el titulo en la propia lista

Repasa el uso de

- Built-in control flow (antes directivas estructurales):  @for / @if
- directivas de atributo y CSS: ngClass (y ngStyle)
- two-way data binding
- manjadores de eventos: (click) ...

Generamos el  modelo de datos (entidad)

```shell
ng g i entities/task --project demo
```

Creamos el componente ToDo y lo consumimos en la página works

```shell
  ng g c components/todo --project demo
```

El componente importara FormsModules, para poder vincular el input de nueva tarea con ngModel

#### La vista (template)

En la vista (template) incluimos

- un **details** para la parte del componente que añade tareas. s
  - un input, con la estética que ya hemos utilizado, ligado con un ngModel
  - un botón con su manejador del evento click
  - un párrafo de errores, que se renderiza condicionalmente cuando hays errores

Como solo hay un input y no hemos visto aún formularios, no lo utilizamos

```html
  <details #refDetails>
    <summary>Añadir tarea</summary>
    <div class="form">
      <div class="control">
        <label>
          <!-- Don`t remove placeholder: used by CSS implementation -->
          <input type="text" placeholder=" " [(ngModel)]="title" (focus)="addError = ''">
          <span>Describe la tarea</span>
        </label>
      </div>
      <div class="buttons">
        <button type="button" (click)="handleAddTask()">Add</button>
      </div>
    </div>
    @if (addError) {<p class="info-error">{{addError}}</p>}

  </details>
```

- una **lista** que itera sobre el array de tareas
- cada **item** de la lista tendrá
  - un checkbox con el atributo checked ligado al item.isComplete
  - un input ligado con ngModel al item.title, que
    - sera readonly hasta que pasemos a modo edición con el botón correspondiente
    - tendrá un manejador del evento blur para salvar cuando dejemos de editar
  - dos botones para editar y borrar con sus manejadores del eventoClick

```html
  <ul #refLista>
    @for (item of tasks; track item.id) {
      <li [title]="item.id" [id]="item.id">
        <div class="card">
          <span><input type="checkbox" [checked]="item.isComplete" (change)="handleChangeTasks(item)"></span>
          <input type="text" [readOnly]="!editMode[item.id]" [(ngModel)]="item.title" (blur)="handleSave(item)" />

          <!-- <span [contentEditable]="editMode">{{item.title}}</span> -->

          <span class="buttons">
            @if (!editMode[item.id]) {
            <button type="button" (click)="handleEdit(item)">Edit</button>

            }
            <button type="button" (click)="handleDeleteTask(item)">Delete</button>
          </span>
        </div>

      </li>
    }
  </ul>
```

Tanto en el details como en la lista (ul) incorporamos referencias locales que permitirán desde el componente acceder a los elementos del DOM, para operaciones como colapsar el details o darle foco al input al activar su edición

#### La lógica del componente

Para obtener unos datos iniciales, creamos un fichero tasks mock, donde una función nos devuelve una promesa con un array de tareas predefinido (hardcoded) en el propio fichero.

En el ngOnInit del componente cargamos los datos, como si vinieran de un API.

Los manjadores de eventos responden a cada uno de los eventos asociados a ellos en la vista

- handleAddTask: añadir tareas
- handleChangeTasks: cambiar el estado 'completada' de una tarea
- handleEdit: poner en modo edición el titulo de una tarea
- handleSave: salir del modo edición salvando los datos
- handleDeleteTask: borrar una tarea

```ts
  handleAddTask() {
    if (!this.title) {
      this.addError = 'Invalid data';
      return;
    }
    const newTaskData: Omit<Task, 'id' | 'isComplete'> = {
      title: this.title,
    };
    this.title = '';
    this.addTask(newTaskData);
    this.refDetails.nativeElement.removeAttribute('open');
  }

  handleChangeTasks(item: Task) {
    item.isComplete = !item.isComplete;
    this.updateTask(item);
  }

  handleEdit(item: Task) {
    this.editMode[item.id] = true;
    this.refLista.nativeElement.children[
      item.id
    ].children[0].children[1].focus();
  }

  handleSave(item: Task) {
    this.editMode[item.id] = false;
    this.updateTask(item);
  }

  handleDeleteTask(item: Task) {
    this.deleteTask(item);
    delete this.editMode[item.id];
  }
```

Como previo a llevar parte de la lógica a un servicio aplicando el patrón repo,
las operaciones sobre el array se han llevado a métodos separados, invocados desde los manejadores:

- addTask
- updateTask
- deleteTask

```ts
  addTask(taskData: Omit<Task, 'id' | 'isComplete'>) {
    const task: Task = {
      id: crypto.randomUUID(),
      isComplete: false,
      ...taskData,
    };
    this.tasks = [...this.tasks, task];
  }

  updateTask(updatedItem: Task) {
    this.tasks = this.tasks.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
  }

  deleteTask(deletedItem: Task) {
    this.tasks = this.tasks.filter((item) => item.id !== deletedItem.id);
  }
```

## **Angular - Día 4 (2-Febrero)**

## Completando ToDo List - La funcionalidad de Añadir

## Arquitectura

## Modelo controlador (contenedor) / presentadores

Cualquier situación que incluye una lista con una serie de items es buena practica componentizarla,
separando la lista y el item como componentes que se pueden comunicar tal como hemos visto.

Podríamos refactorizar la lista de tareas o crear una nueva, e.g. de notas

## Challenge 4. Lista de notas: List / Cards + Add

También sería válido refactorizar el TODO list con List / Card + Add,
pero en lugar de eso, podemos crear una nueva feature con notas,
de características muy similares

Las notas estarán en un array en el propio componente
Se ajustaran a un modelo o entidad:  id - titulo autor - isImportant
El id sera generado con crypto
Se podrá cambiar el estado de la nota de importante a no
Se podrá cambiar el titulo y autor en re-aprovechando el formulario de añadir

### Solución: Lista de notas

Añadimos una nueva entidad
Añadimos una pagina Notes y los componentes notesList, noteCard y noteAdd

```shell
  ng g i entities/note --project demo
  ng g c pages/notes -t -s --project demo
  ng g c components/notesList --project demo
  ng g c components/noteCard --project demo
  ng g c components/noteAdd --project demo
```

La página tendrá su ruta y su opción del menú consumirá el componente notesList, que hará lo propio con noteCard y noteAdd

Definimos la nueva entidad

```ts
  export interface Note {
    id: string;
    title: string;
    author: string;
    isImportant: boolean;
  }
```

De nuevo creamos un mock de datos iniciales, como función que devuelve una promesa en un fichero independiente.

Podemos copiar y modificar el componente TODO retocando algunos de sus campos y su presentación.

Posteriormente podemos segregarlo en los tres componentes que necesitamos

#### Componente notesList

En él vemos como se simplifica la vista, y que se trata del componente controlador

```ts
<isdi-note-add (addEvent)="handleAddNote($event)" />

<h3>Lista de notas</h3>

<ul class="list">
  @for (item of notes; track item.id) {
  <li [title]="item.id" [id]="item.id">
    <isdi-note-card
      [item]="item"
      (updateEvent)="handleUpdateNote($event)"
      (deleteEvent)="handleDeleteNote($event)" />
  </li>
  }
</ul>
```

Sus responsabilidades son

- itera sobre el array de notas
- en cada iteración alimenta al componente **noteCard** con los datos de una nota
- define handlers específicos para los eventos de cada item (**updateEvent** y **deleteEvent**)
- consume también el componente noteAdd definiendo el manejador del evento **addEvent**

```ts
 ngOnInit(): void {
    getNotes().then((notes) => (this.notes = notes));
  }

  handleAddNote(noteData: NoteData) {
    const note: Note = {
      id: crypto.randomUUID(),
      isImportant: false,
      ...noteData,
    };
    this.notes = [...this.notes, note];
  }

  handleUpdateNote(updatedItem: Note) {
    console.log('Deleting in List');
    this.notes = this.notes.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
  }
  handleDeleteNote(deletedItem: Note) {
    this.notes = this.notes.filter((item) => item.id !== deletedItem.id);
  }
```

La lógica del componente corresponde a las operaciones sobre el array de los datos:

- leerlo inicialmente
- añadir items
- modificar items
- borrar items

Aunque no es necesario, podemos hacer estas operaciones sin mutar el array.
Más adelante podemos sacarle partido a esto ajustando la detección del cambio de Angular.

#### Componente noteAdd

La vista es un interface para recoger los datos en dos inputs.
Sería mejor que fuera un formulario, como veremos más adelante.

Utilizaremos nuestro propio componente **isdi-input** que encapsula el input html nativo

Su lógica se limita al handler del botón, que

- validar uno de los campos
- emitir un evento con los datos que ha recogido, que son la parte de una nota que aporta el usuario (tipo NoteData)
- limpiar el estado y por tanto la UI
- colapsar el elemento details del html

```ts
  handleAddNote() {
    if (!this.noteData.title) {
      this.addError = 'Invalid data';
      return;
    }
    this.addEvent.next(this.noteData);
    this.noteData = {
      title: '',
      author: '',
    };
    this.refDetails.nativeElement.removeAttribute('open');

  }
```

Añadimos un botón 'Cancel' que permita acabar el proceso de añadir, sin ningún efecto, colapsando el elemento HTML

```ts
  handleCancel() {
    this.refDetails.nativeElement.removeAttribute('open');
    this.noteData = {
      title: '',
      author: '',
    };
    this.addError = '';
  }
```

#### Componente noteCard

La vista corresponde a la presentación de los datos de una sola nota, que recibe a traves de un input desde el componente padre.

Los eventos que se gestionan en este caso son

- el marcado del checkbox
- el paso al modo edición al pulsar el correspondiente botón
- el guardado de los datos al abandonar el input tras la edición
- el click del botón de borrado

Tras posibles cambios e las propiedades del componente, tres de estos situaciones desencadenan un event para que sea procesado por el componente controlador (padre)

```ts
  handleMarkNotes() {
    this.item.isImportant = !this.item.isImportant;
    this.updateEvent.next(this.item);
  }

  handleEdit() {
    this.editMode = true;
    this.refTitle.nativeElement.focus();
  }

  handleSaveNote() {
    this.editMode = false;
    this.updateEvent.next(this.item);
  }

  handleDeleteNote() {
    this.deleteEvent.next(this.item);
  }
```

## **Angular - Día 5 (5-Febrero)**

Otros temas previos

- Creación de librerías
- Design System: Input; Menu RWD
- Testing
- Sub-Routing
- Ciclo de Vida
- Directivas
- Pipes
- Detección del cambio

## Abstracción de la lógica en servicios. Repositorio

Siguiendo con la mejora de nuestra arquitectura, el siguiente paso es abstraer del componte aquella lógica que no tiene que ver directamente con la presentación.

Como sabemos, si esa lógica tiene que ver con los datos, llevárnosla a una capa independiente es implementar el **patron repository**

Ademas, Angular proporciona un elemento especifico para lo lógica independiente de los componentes denominado **servicio**, que será proporcionado a quien lo necesite, componente u otro servicio, mediante **inyección de dependencias**, de la que se ocupan los **inyectores** del framework

Los inyectores almacenan la instancia del servicio, que obtienen del **provider**, responsable a su vez de aplicar el **patrón singleton**, de modo que existirá una sola instancia del servicio en el ámbito de su provider.

Por defecto el provider es la aplicación, por lo que la instancia de cada servicio será única en toda ella.

Los módulos, como los importados desde angular, juegan el papel de provider de sus propios servios.

### Nueva feature: Courses

Clonamos completamente la feature de Notes para disponer de una nueva para aplicarle la arquitectura que iremos viendo:

- la entity Course incluirá

```ts
  export interface Course {
    id: string;
    title: string;
    author: string;
    isComplete: boolean;
  }
```

- la pagina courses, su ruta y su opción en el menú
- los componentes courses.list, curse.card, curse.add

```shell
  ng g c components/courses-list --project demo
  ng g c components/course-card --project demo
  ng g c components/course-add --project demo
```

### Repositorio inMemory

Para empezar a crear un repositorio podemos definir el interface que usará.

```shell
  ng g i interfaces/repo --project demo
```

Como inicialmente guardará los datos en memoria, devolverá siempre el array de los datos, en forma de promesa para simular los procesos asíncronos que aparecerán cuando el repositorio dependa de un API.

```ts
export interface Repo<T extends { id: string }> {
  getAll(): Promise<T[]>;
  add(newItem: Partial<T>): Promise<T[]>;
  update(id: T['id'], updatedItem: Partial<T>): Promise<T[]>;
  delete(id: T['id']): Promise<T[]>;
}
```

El segundo paso es crear el servicio que lo implemente

```shell
  ng g s services/courses.in.memory.repo --project demo
```

El primero de sus métodos retorna el array de datos predefinidos, igual que hacíamos con las notas

```ts
const COURSES = [...]

@Injectable({
  providedIn: 'root',
})
export class CoursesInMemoryRepoService implements Repo<Curse> {

  async getAll(): Promise<Curse[]> {
    return COURSES;
  }
}
```

El servicio lo es gracias a su decorador, que define la aplicación global como su inyector

Para que se produzca la inyección de dependencias en un componente vasta tener una propiedad inicializada por un parámetro del constructor con un tipo que corresponda a un servicio, definido por el decorador @injectable

```ts
  export class CoursesListComponent implements OnInit {
    constructor(private repo: CoursesInMemoryRepoService) {}

    ngOnInit(): void {
      this.repo.getAll().then((courses) => (this.courses = courses));
    }
  }
```

En el repo tendremos toda la lógica de gestión de los datos del array, que antes estaba en el componente

- añadir cursos

```ts
  async add(curseData: Partial<Curse>): Promise<Curse[]> {
    const curse: Curse = {
      id: crypto.randomUUID(),
      isComplete: false,
      ...curseData,
    } as Curse;
    this.courses = [...this.courses, curse];
    return this.courses;
  }
```

- actualizar cursos

```ts
  async update(id: string, updatedItem: Partial<Curse>): Promise<Curse[]> {
    this.courses = this.courses.map((item) =>
      item.id === id ? { ...item, ...updatedItem } : item
    );
    return this.courses;
  }
```

- borrar cursos

```ts
  async delete(id: string): Promise<Curse[]> {
    this.courses = this.courses.filter((item) => item.id !== id);
    return this.courses;
  }
```

El componente que inyecta el servicio se limita a utilizarlo para mantener siempre actualizado el **estado**, que en este caso es el array con los datos de los cursos

```ts
  ngOnInit(): void {
    this.repo.getAll().then((courses) => (this.courses = courses));
  }

  handleAddCurse(curseData: CurseData) {
    this.repo.add(curseData).then((courses) => (this.courses = courses));
  }

  handleUpdateCurse(updatedItem: Curse) {
    this.repo
      .update(updatedItem.id, updatedItem)
      .then((courses) => (this.courses = courses));
  }

  handleDeleteCurse(deletedItem: Curse) {
    this.repo.delete(deletedItem.id).then((courses) => (this.courses = courses));
  }
```

Mantenemos el formato then para las promesas, en lugar de async/await por su similitud con el de los observables, que usaremos más adelante

## Persistencia en el repositorio con localStore

Para dar una persistencia inicial a nuestra aplicación vamos a usar localStorage.

Pausa 19:05 - 19:15

### Creación de un servicio storage abstrayendo localStore/sessionStore

En lugar de utilizarlo directamente en el repo, lo encapsularemos en un servicio independiente.

```shell
  ng g s services/storage --project demo
```

La principal novedad de este servicio es que si queremos que sea abstracto, necesitamos pasarle parámetros para indicarle

- el nombre del store
- si queremos que utilice localStore o sessionStore

Par ello los definimos en el constructor con el decorador @Inject() que le indica que los recibirá durante la inyección de dependencia

```ts
  constructor(
    @Inject('storeName') private storeName: string,
    @Inject('storeType') @Optional() private storeType?: string
  ) {
    this.storeType = storeType || 'local';
    this.storage = this.storeType === 'local' ? localStorage : sessionStorage;
  }
```

El resto del servicio se limita a encapsular los métodos de local/sessionStore recibiendo o devolviendo los datos de acuerdo con el tipo asignado en forma de genérico.

```ts
export class StorageService<T> {
  private storage: Storage;
  ...

  get() {
    const initialData = this.storage.getItem(this.storeName);
    if (!initialData) return null;
    return JSON.parse(initialData) as T;
  }

  set(data: T) {
    const finalData = JSON.stringify(data);
    this.storage.setItem(this.storeName, finalData);
  }

  remove() {
    this.storage.removeItem(this.storeName);
  }
}
```

### Uso del servicio en un nuevo repo: courses.local.repo

Creamos un nuevo servicio courses.local.repo que implementará el mismo interface que el anterior

```shell
  ng g s services/courses.local.repo --project demo
```

Inyectamos el servicio StorageService concretando su tipo como Course[] y pasándole los parámetros que necesita

Para ello unamos un token de tipo factory como el que vimos en el test del componente

```ts
const storeName = 'Courses';
const STORAGE_TOKEN = new InjectionToken<StorageService<Course[]>>(
  'Storage Service',
  {
    providedIn: 'root',
    factory: () => new StorageService<Course[]>(storeName),
  }

  export class CoursesLocalRepoService implements Repo<Course> {
    courses: Course[];

    constructor(@Inject(STORAGE_TOKEN) private ls: StorageService<Course[]>) {
      this.courses = this.ls.get() || COURSES;
    }
    ...
  }
);

```

### Uso del repo courses.local.repo en el componente

El componente CoursesList ya utiliza el repo CoursesInMemoryRepoService
Como el nuevo repo CoursesLocalRepoService utiliza el mismo interface, basta inyectarlo en lugar del anterior para que la aplicación lo utilice y tenga persistencia local.

No es necesario ningún otro ajuste a nivel de los componentes, que son totalmente agnósticos a la capa repositorio, siempre que se respete el interface

Tan solo es necesario algunos ajustes de los test, y añadir los del repo CoursesInMemoryRepoService que antes estaba testado indirectamente y ahora deja de estarlo al no ser usado por ningún componente.

Es un test similar al del otro repo pero mas sencillo.
Le damos valor directamente a la propiedad courses del servicio y comprobamos coo se modifica cuando invocamos los distintos métodos

- getAll()

```ts
  service.courses = [];
  const result = await service.getAll();
  expect(result).toEqual([]);
```

- add()

```ts
  service.courses = [];
  const result = await service.add({ id: '1' });
  expect(result).toEqual([{ id: '1', isComplete: false } as Course]);
```

- update()

```ts
  service.courses = [
    { id: '1', isComplete: false } as Course,
    { id: '2', isComplete: false } as Course,
  ];
  const result = await service.update('1', { id: '1', isComplete: true });
  expect(result).toEqual([
    { id: '1', isComplete: true } as Course,
    { id: '2', isComplete: false } as Course,
  ]);
```

- delete()

```ts
  service.courses = [{ id: '1', isComplete: false } as Course];
  const result = await service.delete('1');
  expect(result).toEqual([]);
```

## Sub-routing

### Sub-routing en la página Courses

Añadimos en la página Courses 2 sub-páginas, que situaremos en la carpeta de la página home

```shell
ng g c pages/courses/child-courses1 -t -s --skip-selector --project demo
ng g c pages/courses/child-courses2 -t -s --skip-selector --project demo
ng g c pages/courses/child-courses3 -t -s --skip-selector --project demo
```

Como van a ser páginas, las creamos sin selector y posteriormente cambiamos la exportación a default

En el archivo de rutas, dentro de la ruta home, definimos las rutas children

```ts
  {
    path: 'home',
    loadComponent: () => import('./pages/courses/courses.component'),
    children: [
      {
        path: 'child1',
        loadComponent: () =>
          import('./pages/courses/child-courses1/child-courses1.component'),
      },
      {
        path: 'child2',
        loadComponent: () =>
          import('./pages/courses/child-courses2/child-courses2.component'),
      },
    ]
  }
```

Igual que en las rutas principales, podemos añadir al principio una ruta para el path vacío (la url de home) y una ruta alternativa para cualquier otro valor distinto de los que hemos indicado.

```ts
  { path: '', pathMatch: 'full', redirectTo: 'child1' },
  ...
  { path: '**', redirectTo: 'child1' },
```

En el componente (página) courses añadimos un router-outlet, para definir el punto en el que queremos que se carguen las páginas hijas.

## Formularios Template-Driven

En Angular existen dos enfoques a la hora de crear los formularios

- Formularios Template-driven (no reactivos)
- Formularios data-driven o reactivos, basados directamente en RxJs.

### Creación del formulario

En este caso los formularios quedan definidos por dos directivas de Angular

- NgForm, que se aplica implícitamente también a nivel de la etiqueta Form
- NgModel, que ya conocemos, pero aplicada en el marco de la anterior directiva

<!-- La primera de ellas vincula el formulario con una propiedad del componente de tipo objeto
de forma que el name de cada control del formulario hará el doble binding con una propiedad del objeto del mismo nombre. -->

Para implementar nuestro formulario vamos a crear un componente CourseRegister
en el que recogeremos los datos para un registro de un usuario en un curso

```shell
  ng g c components/register-course --project demo
```

Renderizaremos el componente en la última sub-página de Home

La directiva **NgForm** tiene como selector form, por lo que, una vez importado FormsModule, se aplica implícitamente a la etiqueta form html nativa: el formulario html (form) queda asociado con una instancia de la directiva NgForm.

La instancia de ngForm está oculta a nivel del componente pero puede ser expuesta vinculando en el formulario html una referencia local (#ref) con la directiva (ngForm)

```html
  <form #form #ngForm="ngForm">
```

A la referencia local podremos acceder desde el componente gracias al decorados @ViewChild, como ya hemos visto.

El decorador admite, en su objeto de configuración, la propiedad static, con dos posibles valores

- true to resolve query results before change detection runs,
- false [Default] to resolve after change detection.

De esa forma, en el NgOnInit podemos ver tanto el formulario html como la instancia de la directiva NgForm

```ts
  export class RegisterCourseComponent implements OnInit {
    @ViewChild('form', { static: true }) formRef!: ElementRef;
    @ViewChild('ngForm', { static: true }) ngFormRef!: NgForm;

    ngOnInit(): void {
      console.log('onInit', this.formRef);
      console.log('onInit', this.ngFormRef);
    }
  }
```

La directiva ngForm crea un **FormGroup** a nivel del formulario y permite llamar desde el ngForm a los métodos y propiedades de la instancia del FormGroup.

Una de esas propiedades es el value, un objeto que representa a todos los controles del FormGroup.

Par que la directiva FormGroup reconozca los controles del formulario es necesario que se cumplan dos condiciones

- que tengan con un valor el atributo name
- que se les aplique la directiva ngModel (en esté caso sin en two-way data binding)

Hecho esto, podemos ver como su valor se incorpora al del FormGroup, invocándolo desde la referencia al ngForm formateada con el pipe json

```html
<form #form #ngForm="ngForm">
  <label>
    <input type="text" name="userName" ngModel>
    <span>Nombre de usuario</span>
  </label>
  <label>
    <input type="email" name="userEmail" ngModel>
    <span>Correo electrónico</span>
  </label>
</form>
<pre>{{ ngForm.value | json}}</pre>
```

## **Angular - Día 6 (6-Febrero)**

## Formularios Template-Driven (continuación)

### Controles de formulario

Para comprobar las escasas diferencias en el uso de los distintos controles, añadiremos

- input type text / email / password
- textarea
- input type checkbox
- conjunto de inputs type radiobutton
- select / options

Las distintas variantes del **input text** (email, password) se comportan de igual forma y lo mismo sucede con la **textarea**,
aunque su css puede ser algo distinto

El los **checkbox**, angular ya toma en el ngModel el valor boolean de la propiedad checked, sin que haya que hacer nada.

En los **radio buttons**, se aplica en cada uno de ellos la directiva ndModel, pero como comparten el mismo name, el conjunto se asocia con una sola propiedad del FormGroup, que guardara él value de la opción elegida.

Al ser conjuntos de elementos, podemos generarlos iterando sobre un array de datos.

```ts
  courseModes: CourseMode[] = [
    { id: 'o', name: 'Online' },
    { id: 'p', name: 'Presencial' },
    { id: 'm', name: 'Mixto' },
  ];

```

Si la iteración se hace sobre objetos, el value de cada radio button puede ser el objeto entero.

```html
  <fieldset>
    <legend [ngClass]="{'selected': ngForm.value.courseMode}">
      Modalidad del curso</legend>
    @for (item of courseModes; track item.id) {
      <label>
        <input type="radio" name="courseMode" [value]="item" ngModel>
        <span>{{item.name}}</span>
      </label>
    }
  </fieldset>
```

En los select / options, la directiva ngModel solo se aplica en el select

Nuevamente es frecuente que las options se obtengan de un array de datos maestros

```ts
  courseOptions: Course[] = [
    { id: 'a', name: 'Angular' },
    { id: 'r', name: 'React' },
    { id: 'v', name: 'Vue' },
    { id: 'n', name: 'Node' },
  ];
```

En este caso, si la iteración se hace sobre objetos y el value de de la option seleccionada es el objeto entero, es necesario utilizar **[ngValue]**. El value nativo de los elementos option sólo admite strings

```html
    <label>
      <select name="course" ngModel>
        <option value=""></option>
        @for (item of courseOptions; track $index) {
        <option [ngValue]="item">{{item.name}}</option>
        }
      </select>
      <span>Curso</span>
    </label>

```

El valor vacío previo a la iteración implica una opción vacía al inicio del select que se puede recuperar en cualquier momento.

Si se elimina, Angular mantiene el select vacío inicialmente, pero tras una primera selección no puede volverse a ese estado inicial vacío.

### Envío de los datos

Una vez creado un botón de tipo submit, hay que añadir el manejador del evento submit a nivel del formulario, empleando la directiva **ngSubmit** en lugar del evento nativo submit (aunque también es posible usar este)

Dos características por defecto de los formularios de angular

- aplican el atributo novalidate en el form de Html, anulando toda la validación nativa de HTML
- aplican en event.preventDefault() en la gestión del evento submit, por so que se anula el envío del formulario, nativo de HTML

Para recoger los datos del formulario podemos

- utilizar la propiedad del componente que apunta a la referencia de ngForm
- pasar como parámetro del handleSubmit el valor de esa referencia

El handleSubmit tendrá de este modo un objeto con los datos del formulario que podrá añadir al componente, modificarlo o emplearlo en la lógica de negocio.

```ts
  handleSubmit(data: RegisterData): void {
    this.registerData = data;
    console.log(this.registerData);
  }
```

### Validación

La validación de los formularios en Angular se basa en las **propiedades auto-generadas** a partir de los atributos HTML, en el FormGroup y en cada uno de los controles que forman parte de él

- ngPristine / ngDirty
- ngTouched / ngUntouched
- ngValid / ngInvalid

Además al formulario y sus controles, Angular les asigna clases con los nombres de las propiedades, que permiten extender la validación a nivel del CSS

En el caso de los formularios template-driven, las restricciones (constrains) de validación se definen en base a los **atributos HTML5**

- required
- email
- minlength / maxlength
- min / max
- pattern

Finalmente, los controles del FormGroup cuentan con una propiedad **errors** que puede ser null o un objeto con propiedades correspondientes a los distintos errores derivados de la violación de la restricciones impuestas en cada caso

Las estrategias de validación, como sucede al margen de Angular son diversas, aunque una de las más frecuentes en Angular es:

- mantener el botón de enviar **deshabilitado** mientras el formulario no sea válido
- ir **informando al usuario** de los problemas en la validación conforme va pasando (touched) por los sucesivos controles que componen el formulario.

Para aplicar esta estrategia comenzamos por

- definir como required los controles
- deshabilitar el botón de submit mientras el formulario sea inválido

```html
  <button type="reset" [disabled]="ngForm.pristine">Cancelar</button>
  <button type="submit" [disabled]="ngForm.invalid">Enviar</button>
```

En cada control se añaden los diversos mensajes de error renderizándolos condicionalmente
para que aparezcan en el caso adecuado.

Para ello angular proporciona los estados del control antes mencionados

- ngPristine / ngDirty
- ngTouched / ngUntouched
- ngValid / ngInvalid

y el método hasError() para comprobar que error hay en el objeto errors del control

```html
 @if (
    ngForm.controls["email"] &&
    ngForm.controls["email"].touched &&
    ngForm.controls["email"].invalid
  ) {
    @if (ngForm.controls["email"].hasError("required")) {
      <p class="info-error">El correo es obligatorio</p>
    } @else if (ngForm.controls["email"].hasError("email")) {
      <p class="info-error">El formato del correo no es válido</p>
    }
  }
```

## Introducción al backend

Vamos a simular un backend con json-server.

Por si no lo tenemos instalado globalmente, lo añadimos a nuestro workspace

```shell
  npm i json-server
```

Añadimos la carpeta server, donde querremos los datos de nuestro fake-server

```shell
  mkdir server
```

 Creamos un script en el package json, sin el modificador --watch, que a pasado a estar por defecto

```json
 "server": "json-server -p 3030 server/db.json"
  ```

Si no crea el fichero db.json lo creamos a mano y en cualquier caso añadimos la propiedad courses con el array de ejemplos que teníamos en services/mock.data.ts

En un nuevo terminal ejecutamos el script de npm

```shell
  npm run server
```

### Configuración del acceso al backend

Vamos a definirlo en una variable de entorno.

Angular proporciona un sistema para hacerlo, pero no lo instala por defecto: debemos añadirlo en nuestra aplicación

```shell
  ng g environments --project demo-rx
```

El resultado será

```shell
CREATE projects/demo-rx/src/environments/environment.ts (31 bytes)
CREATE projects/demo-rx/src/environments/environment.development.ts (31 bytes)
UPDATE angular.json (7968 bytes)
```

El fichero environment.development.ts sera al que accederemos desde nuestro código
Al fichero environment.ts accederá angular directamente cuando este en modo producción

De esta forma podemos definir variables con diferentes valores en función del entorno

En ambos crearemos la variable baseUrl con un valor 'http://localhost:3030/'

Una vez hecho un commit podemos excluir de git futuros cambios del fichero db.json para no estar actualizando el repo con los cambios en el fake.backend

```ts
  git update-index --assume-unchanged server/db.json
```

### Servicio de acceso al backend: servicio APIRepo encapsulando fetch

Antes de pasar a las herramientas de programación reactiva que nos proporciona Angular, vamos a comprobar como podemos usar el fetch nativo de JS encapsulandolo en un servicio Angular que implementará el mismo interface que ya hemos usado en los repositorios vistos previamente

## Reactividad basada en RxJs

[RxJs](https://rxjs.dev/) es la librería reactiva más importante en JS, proporcionado un tipo de dato conocido como Observables, junto varias extensiones suyas y multitud de operadores para manejarlos.

> RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code. This project is a rewrite of Reactive-Extensions/RxJS with better performance, better modularity, better debuggable call stacks, while staying mostly backwards compatible, with some breaking changes that reduce the API surface.
> [RxJs](https://rxjs.dev/)

Recientemente liberada su versión 7, se incorpora en Angular 17 como dependencia "rxjs": "~7.8.0".

Proporciona al framework entre otras cosas

- la clase **EventEmitter** como extensión indirecta de la clase Observable, que ya hemos visto
- el sustrato de los **formularios reactivos**
- el servicio **HttpClient** que encapsula las conexiones Http, sustituyendo a fetch
- los medios necesarios, basados en clases que extienden de Observables, como **BehaviorSubject**, para la implementación de una gestión de estados que puede utilizar el patrón **Flux**

Para poder trabajar en todo ello, y también para aprovechar las características del workspace de Angular, vamos a añadirle una segunda aplicación

### OBSERVABLES

Los observables son la representación de un flujo de datos (stream) al que podemos suscribirnos.
De esa forma cuando el flujo cambia, nuestra suscripción reacciona.

En la práctica es similar al then de las promesas, con una diferencia clave

- una promesa solo se resuelve una vez, fulfilled o rejected, mientras que
- un observable puede emitir un número indeterminado de datos y errores

En la práctica los Observables ligados al protocolo Http solo emiten una vez,
pero eso es propio del protocolo, no de los observables

En consecuencia, al suscribirnos a un observable le proporcionamos la callback que se ejecutara ante cada dato

```ts
  observable.subscribe( data => console.log(data))
```

Si necesitamos pasarle más callback lo haremos en forma de objeto

```ts
  observable.subscribe({
    next: (data) => console.log(data),
    error: (error: Error) => console.error(error.message),
    complete: () => {} // make anyway
  });
```

## **Angular - Día 7 (7-Febrero)**

## Conexiones Http con el backend

### Interface del repositorio

Al crear el interface del repositorio podríamos optar por dos opciones:

- un nuevo interface que se adapte al funcionamiento habitual del backend (e.g. basado en JSONServer)

  - los métodos add y update devuelven el item creado/actualizado como observable
  - el método delete devuelve un observable void

```ts
import { Observable } from "rxjs";

export interface Repo<T extends { id: string }> {
  getAll(): Observable<T[]>;
  add(newItem: Partial<T>): Observable<T>;
  update(id: T['id'], updatedItem: Partial<T>): Observable<T>;
  delete(id: T['id']): Observable<void>;
}
```

- mantenemos el interface que tenemos

  - todos los métodos devuelven los datos completos (un array de T)

```ts
import { Observable } from "rxjs";

export interface Repo<T extends { id: string }> {
  getAll(): Observable<T[]>;
  add(newItem: Partial<T>): Observable<T[]>;
  update(id: T['id'], updatedItem: Partial<T>): Observable<T[]>;
  delete(id: T['id']): Observable<T[]>;
}
```

Si el backend se comporta así, esto significa que el backend enviará muchos más datos.
La ventaja será que en cada operación estaremos actualizándonos a los posibles cambios que hayan producido otros clientes.

Si nuestro backend no se comporta así, será responsabilizad del repo que los datos se ajusten al interface.
Podrá añadir peticiones getAll o construir los datos finales a partir de los que tiene
En este segundo caso, el repo procesa los datos que le llegan antes de devolverlos

Vamos a aplicar este último planteamiento.

### Servicio de acceso al backend: servicio APIRepo encapsulando HttpClient

Angular proporciona un servicio responsable de las conexiones Http, denominado **httpClient**, que puede comportarse como una encapsulación de fetch

No sería buena practica usarlo directamente en un componente, sino que se debe encapsular en un servicio propio, en este caso un repositorio

```shell
  ng g s services/courses.api.repo --project demo-rx
```

Para usar el servicio HttpClient es necesario considerar el provider que lo proporcionará: **'@angular/common/http/provideHttpClient'**;
Tendremos que añadirlo en el fichero de configuración app.config.ts
pudiendo pasarle el parámetro withFetch para que encapsule **fetch** en lugar del original httpXmlRequest

```ts
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [..., provideHttpClient(withFetch())],
};
```

Ahora ya podemos inyectarlo en nuestro servicio

```ts
export class CoursesApiRepoService implements Repo<Course> {
  constructor(private http: HttpClient) {
    this.apiUrl = new URL('courses', environment.baseUrl).href;
  }
}
```

Aprovechamos el constructor para construir la url del endpoint del backend,
a partir de la url del servidor que dependiendo del entorno (dev, prod...),
habremos obtenido del correspondiente fichero environment.

Para ello usamos la URL API disponible en Node y en los navegadores actuales

Finalmente tendremos que implementar sus métodos de acuerdo con el interface

### Uso en el componente CursesList

Sustituimos el repositorio utilizado en el componente CourseList.
De nuevo, como el interface es el mismo, la sustitución no exige ningún otro cambio en la aplicación.

### Gestión de errores en el servicio

En el moment en que dependemos de una conexión http tenemos que gestionar dos posibles situaciones de error, que ya son contempladas por el servicio http:

- los problemas en el lado del cliente, como un error de red que impide que la solicitud se complete correctamente o una excepción lanzada en un operador RxJS.
  Estos errores tienen un status establecido en 0 y una propiedad error que contiene un objeto ProgressEvent, cuyo type podría proporcionar más información.
- las respuestas del servidor backend cuando rechaza la solicitud con un código de estado 4xx / 5xx. Estas son respuestas de error (**error responses**).

En cualquiera de los casos, los errors pueden ser capturados en un pipe del observable, con el operador RxJx catchError
Éste tendrá como parámetro el callback definido como manejador de los errores (error handler).

```ts
  .pipe(
    catchError((errorResponse: HttpErrorResponse) => {
      let errorMessage: string;
      if (errorResponse.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        // errorResponse.error contiene la información del error
        errorMessage = `Se ha producido un error interno ${errorResponse.error}`;
        console.error(errorMessage);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        errorMessage = `El Backend ha devuelto un código ${errorResponse.status} con el mensaje ${errorResponse.error}`;
        console.error(errorMessage);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error(errorMessage));
    })
  )
```

El objeto de este handler es crear un mensaje de error coherente de cara al usuario,
Al final el operador throwError reenvía el error como parte del observable
De esa forma los componentes que se suscriban podrán recuperar el error
para incorporarlo el feedback al usuario que tengan previsto.

En lugar de mantener el callback anónimo como se ve, lo convertiremos en un método privado
que usaremos en todas las operaciones de nuestro servicio de cara al backend

```ts
  .pipe(catchError(this.handleError))
```

### Uso de la gestión de errores en el componente CoursesList

Todos los métodos del componente al suscribirse al servicio, deben definir también el método que gestionará los errores.
Una opción es disponer de un objeto que almacene los posibles mensajes de error de los métodos

```ts
type ServiceErrors = {
  load?: string;
  add?: string;
  update?: string;
  delete?: string;
};

export class CoursesListComponent implements OnInit {
  ...
  errors: ServiceErrors = {};

ngOnInit(): void {
    this.repo.getAll().subscribe({
      next: ...,
      error: (error: Error) => (this.errors.load = error.message),
    });
  }
}
```

En la vista podemos hacer rendering condicional en base a los mensajes de error
o definir la forma que consideremos para der feedback al usuario

```html
@if (errors.load) {

  <div class="error-info">
    <p>No se puede acceder al servidor</p>
    <p>{{errors.load}}</p>
  </div>

} @else {

  <ul class="list">
  ...
  </ul>

}
```

19:09 - 19:20

## Flux: Servicio con estado para el Store. BehaviorSubject y Observables

## Gestión de usuarios: Authentication (Autenticación) y Authorization (Autorización)

Dos procesos relacionados con la gestión de usuarios y englobados en l denominación **Auth**

- Authentication (Autenticación)
- Authorization (Autorización)

Ambos implican la participación tanto del backend como del frontend.

En el **Backend** se almacena la información del usuario y se proporcionan elementos que permitirán su posterior identificación como los tokens del estándar JWT

Desde el frontend se llevan a cabo diversas operaciones

- registro de los usuarios, enviando sus datos al backend
- login de los usuarios proporcionando al backend las credenciales necesarias
- almacenamiento de los datos del usuario, incluyendo el token
- firmando con el token: Interceptores
- protección de determinadas rutas, por ejemplo en función del rol del usuario: Guardas
- eliminación de los datos del usuario (logout)

### Tipado de los datos del usuario

El punto de partida son los distintos **tipos** que definen la entidad del usuario en distintos contextos

- los datos de login
- los datos enviados en el registro
- los datos devueltos por el API
- los datos que maneja la aplicación

Veamos nuestro caso, a modo de ejemplo

- los datos de login

```ts
  export interface LoginData {
    email: string; // From Input email
    passwd: string; // From Input password
  }
```

- los datos enviados en el registro

```TS
  export interface RegisterData {
    email: string; // From Input email
    passwd: string; // From Input password
    firstName: string; // From Input text
    surname: string; // From Input text
    gender: Gender; // From RadioButtons
    country: Country; // From Select
    birthDateIso: string; // From DatePicker
    bio: string; // From TextArea
    termsAcceptance: boolean; // From Checkbox
  }
```

Ambos tipos coinciden con los datos recogidos en los formularios de los componentes **Login** y **Register**

Son los únicos en los que aparece la contraseña:

- nunca se almacena en el front
- se envía al back siempre en el body, aprovechando la seguridad que proporciona https
- nunca vuelve a enviarse desde el back, una vez recibida
- siempre se almacena hasheada (hashed) lo que impide su recuperación

- los datos devueltos por el API

```ts
export interface UserData {
  id: string;
  email: string;
  firstName: string;
  surname: string;
  gender: Gender;
  country: Country;
  birthDateIso: string;
  bio: string;
  termsAcceptance: boolean;
  role: string;
  token: string;
}
```

Como hemos dicho, nunca incluyen contraseñas, pero si suelen incluir el token, en caso de que exista

También pueden incluir datos creados o generados en el back, como el id o el role, que no fueron proporcionados por el usuario en el proceso de registro

- los datos que maneja la aplicación

```ts
export interface User extends Omit<UserData, 'birthDateIso' | 'token'> {
  birthDate: Date;
}
```

pueden ser iguales a los recibidos del backend, o sufrir alguna transformación o incluir algún dato calculado.

En este caso la propiedad con las fechas com string en formato ISO se sustituye por otra con la fecha de tipo Date

### Servicio UsersStore

Los datos del usuario logado (currentUser) y el hecho de que exista un usuario logado (que no sea null) suelen ser importantes para distintas partes de laa aplicación, por lo que es frecuente guardarlos en un **estado centralizado**, en nuestro caso de acuerdo con el **patrón FLux** que ya hemos descrito

Creamos un servicio **UsersStore** con esta finalidad

```shell
  ng g s store/users.store  --project demo-rx
```

En este servicio

- definimos el tipo del estado que manejaremos, basado el observables
- definimos el tipo de los datos iniciales del estado
- creamos una propiedad con el valor de esos datos iniciales

```ts
export type UserState = {
  currentUser: Observable<User | null>;
  token: Observable<string>;
  errors: Observable<UserErrors>;
};

const initialState: {
  currentUser: User | null;
  token: string;
  errors: UserErrors;
} = {
  currentUser: null,
  token: '',
  errors: { login: '' },
};
```

Para cada una de las propiedades del estado, existirá en este un BehaviorSubject cuyo primer valor emitido corresponderá al del initialState.

Por convenio, las variables reactivas (observables, subjects, behaviorSubjects...) se nombran acabados en $, para reconocer fácilmente su carácter reactivo.

La clase **Subject** extiende la clase **Observable**, añadiendo entre otras cosas un método next, que loes permite emitir información cuando es necesario, a la que reaccionarán los elementos suscritos al Subject.

Los **BehaviorSubject**, son uns variación de los anteriores, que emiten siempre un primer valor en el momento en que se instancian

```ts
  private currentUser$: BehaviorSubject<User | null>;
  private token$: BehaviorSubject<string>;
  private errors$: BehaviorSubject<UserErrors>;

  constructor(public repo: UsersMemoryRepoService) {
    this.currentUser$ = new BehaviorSubject(initialState.currentUser);
    this.token$ = new BehaviorSubject(initialState.token);
    this.errors$ = new BehaviorSubject(initialState.errors);
  }
```

Como las propiedades que definen el estado (BehaviorSubjects) son todas privadas es necesario algún método getter para acceder a ellos, que siempre los devolverá com Observables

```ts
  getState() {
    const state: UserState = {
      currentUser: this.currentUser$.asObservable(),
      token: this.token$.asObservable(),
      errors: this.errors$.asObservable(),
    };
    return state;
  }
```

De esta forma se evita que desde fuera del StateService puedan cambiarse los valores del estado propagando el cambio al resto de la aplicación.

Todos los cambios de estado vendrán de los métodos adecuados definidos en StateService.

Un ejemplo de estos métodos es el que permite resetear los mensajes de existencia de algún error

```ts
  setNoErrors() {
    this.errors$.next({ ...initialState.errors });
  }
```

Como todos los metodos que modifican parte del estado, se limitan a emitir su nuevo valor, al que reaccionaran tos los elementos suscritos, e.g. reflejando los cambios en el renderizado de su vista

El principal de los métodos es el de login, que necesitará llamar a su correspondiente método en el repo, suscribiéndose a los resultados

```ts
  login(loginData: LoginData) {
    this.repo.login(loginData).subscribe({
      next: ({ user, token }) => {
        this.currentUser$.next(user!);
        this.token$.next(token!);
      },
      error: (error: Error) => {
        console.log('State Error', error);
        this.errors$.next({ login: error.message });
      },
    });
  }
```

Si el login en el repo ha sido correcto, se modifica el estado con los datos del usuario, emitiendo el nievo estado.
Si el login no ha sido posible, se notifica el error.

### Servicio UsersMemoryRepo

El proceso de comprobar si el login es posible corresponde a la capa **repositorio**.

Normalmente lo haría enviándolos datos a un **endpoint** de un **backend** que implementaría la lógica de dicha comprobación.

En este caso usamos, por motivos didácticos, un repo in-Memory que guarda en memoria los datos del usuario/s e implementa la lógica da comprobar si el login es correcto.

En este repo tenemos una constante con los datos hardcoded de un usuario registrado en la aplicación, que se cargan en memoria al instanciar el servicio

```ts
  const USERS: (UserData & { passwd: string })[] = [
    {
      id: crypto.randomUUID(),
      email: 'pepe@sample.com',
      passwd: '12345',
      ...
      token: '12345-token',
    },
  ];

  export class UsersMemoryRepoService {
    users = USERS;
    ...
  }
```

El método **login()** del **repo**

- hace una búsqueda por email en el array de users
- comprueba la contraseña
- emite un error si falla alguno de ambos

```ts
  login(loginData: { email: string; passwd: string }):
    Observable<LoginResult> {

    const foundUser = this.users.find(
      (user) =>
        user.email === loginData.email && user.passwd === loginData.passwd,
    );

    if (!foundUser || foundUser.passwd !== loginData.passwd) {
      // return new Observable((subscriber) => {
      //   subscriber.error(new Error('User not found'));
      // });
      return throwError(() => new Error('User not valid'));
    }
```

- si no ha habido error, ajusta los datos al tipo User (el tipo interno de la aplicación)
- devuelve un observable con el usuario y el token

```ts login()
    ...
    const { passwd, ...userData } = foundUser;
    const { token, birthDateIso, ...userDataClean } = userData;
    const user: User = {
      ...userDataClean,
      birthDate: new Date(birthDateIso),
    };
    return of({ user, token });
  }
```

### Componente Login

En el componente **Login** que ya teníamos, con el formulario de Login,
inyectamos el servicio UsersStore ara poder hacer uso de él

```ts
  private usersStore = inject(UsersStoreService);
```

En el método onSubmit, se ajusta el formato de los datos para que pasen como parámetro al ejecutas el método login del servicio

```ts
  onSubmit() {
    if (this.formGroup.invalid || this.formGroup.pending) {
      return;
    }
    const loginData: LoginData = {
      email: this.formGroup.value.email!,
      passwd: this.formGroup.value.passwd!,
    };
    this.usersStore.login(loginData);
  }
```

Si todo va correctamente, es estado se actualizará con los datos y el token del usuario logado, notificando el cambió a todos los elementos de la aplicación que estén suscritos.

## Challenge Flux

Pare emplear una gestión de estado centralizada vamos a añadir una nieva feature tareas,
que en principio clonaremos de ta que ya tenemos

### Iniciando la feature tareas

Añadimos una nueva entidad
Añadimos una pagina Tasks y los componentes tasksList, taskCard y taskAdd
Añadimos el servicio tasks.api.repo.service

```shell
  xcopy projects\demo-rx\src\app\entities\course.ts projects\demo-rx\src\app\temp\entities\task.ts
  xcopy projects\demo-rx\src\app\pages\courses\courses.* projects\demo-rx\src\app\temp\pages\tasks\ /s /e
  xcopy projects\demo-rx\src\app\components\course-add projects\demo-rx\src\app\temp\components\task-add /s /e
  xcopy projects\demo-rx\src\app\components\course-card projects\demo-rx\src\app\temp\components\task-card /s /e
  xcopy projects\demo-rx\src\app\components\courses-list projects\demo-rx\src\app\temp\components\tasks-list /s /e
  xcopy projects\demo-rx\src\app\services\courses.api.repo.service.*  projects\demo-rx\src\app\temp\services\ /s /e
```

La página tendrá su ruta y su opción del menú consumirá el componente tasksList, que hará lo propio con taskCard y taskAdd

Definimos la nueva entidad

```ts
  export interface Task {
    id: string;
    title: string;
    author: string;
    isImportant: boolean;
  }
```

De nuevo creamos un endpoint en el back con unos datos iniciales.

Podemos copiar y modificar los componentes y el servicio junto con sus tests

### Creación de un servicio con estado

El nuevo servicio actuará como un store de los estados globales de la feature Tasks de la aplicación.

```shell
  ng g s store/tasks.store --project demo-rx --dry-run
```

El estado (TasksState) lo definiremos como

data (Tasks[]): el array de tareas
errors: un objeto con los mensajes de errors de load, add, update, delete

```ts
export type TasksErrors = {
  load?: string;
  add?: string;
  update?: string;
  delete?: string;
};

export type TasksState = {
  data: Observable<Task[]>;
  errors: Observable<TasksErrors>;
};
```

Lo importante es que el estado no almacena directamente los valores,
sino los correspondientes observables

Como propiedades **privadas** de la clase, declaramos los **BehaviorSubjects** correspondientes a cada propiedad del estado, que nos proporcionaran los correspondientes observables

En el constructor creamos los BehaviorSubjects de cada parte del estado,
que directamente emiten  los valores iniciales

```ts
  private tasks$: BehaviorSubject<Task[]>;
  private errors$: BehaviorSubject<TasksErrors>;

  constructor(private repo: TasksApiRepoService) {
    const initialTasks: Task[] = [];
    const initialErrors: TasksErrors = {};

    this.tasks$ = new BehaviorSubject(initialTasks);
    this.errors$ = new BehaviorSubject(initialErrors);
  }
```

Añadimos el método de acceso al estado (**getState**), que devuelve todas sus propiedades en forma de observables creados a partir de los BehaviorSubject.

Aquí está la clave del patrón Flux: los suscripciones al estado podrán leer los valores pero nunca modificar el estado. Para eso nuestro servicio proporcionará las funciones apropiadas

```ts
  getState() {
    const state: TasksState = {
      data: this.tasks$.asObservable(),
      errors: this.errors$.asObservable(),
    };
    return state;
  }
```

En este caso hay además una función que setter que elimina todos los errores

```ts
  setNoErrors() {
    this.errors$.next({});
  }
```

La primera de las funciones relativa al array de datos, carga los valores desde el repo y lo emite en el BehaviorSubject

```ts
 loadTasks() {
    this.repo.getAll().subscribe({
      next: (tasks) => {
        this.tasks$.next(tasks);
      },
      error: (error: Error) => this.errors$.next({ load: error.message }),
    });
  }

```

El resto, son las funciones que gestionan los cambios en el array.
Son muy simples y similares a la anterior porque la lógica de los cambios esta en el repo,
y se limitan a emitir con el BehaviorSubject los valores del array modificado

```ts
  addTask(taskData: TaskData) {
    this.repo.add(taskData).subscribe({
      next: (tasks) => this.tasks$.next(tasks),
      error: (error: Error) => this.errors$.next({ add: error.message }),
    });
  }

  updateTask(updatedItem: Task) {
    this.repo.update(updatedItem.id, updatedItem).subscribe({
      next: (tasks) => this.tasks$.next(tasks),
      error: (error: Error) => this.errors$.next({ update: error.message }),
    });
  }

  deleteTask(deletedItem: Task) {
    this.repo.delete(deletedItem.id).subscribe({
      next: (tasks) => this.tasks$.next(tasks),
      error: (error: Error) => this.errors$.next({ delete: error.message }),
    });
  }
```

### Uso del servicio con estado en el componente lista

El componente lista (TasksList) se simplifica enormemente

- Ya no se le inyecta el servicio repo
- En su lugar se le inyecta el servicio con el estado (TasksStoreService)
- En el OnInit ejecuta el método loadTasks() del servicio, para cargar los datos
- Desaparecen los métodos handle de los eventos de los componentes hijos, que se comunicaran directamente con el servicio responsable del estado

```ts
export class TasksListComponent implements OnInit {

  constructor(public tasksStore: TasksStoreService) {}

  ngOnInit(): void {this.tasksStore.loadTasks()}

}
```

- Para acceder al estado nos podríamos suscribir en el constructor

```ts
  tasks: Task[] = [];
  errors: TasksErrors = {};
  constructor(public tasksStore: TasksStoreService) {
    this.tasksStore.getState().data.subscribe((tasks) => (this.tasks = tasks));
    this.tasksStore.getState().errors.subscribe((errors) => (this.errors = errors));
  }

```

Sin embargo es mejor práctica hacer la suscripción en el template con el pipe **async**
Para ello habrá que importarlo

```ts
  imports: [AsyncPipe, TaskCardComponent, TaskAddComponent],
```

Ya en ma vista haremos un @if global, que nos permita

- la suscripción con el pipe async el observable de los errores
- darle un alias al valor devuelto por la suscripción: errors
- renderizar condicionalmente en función de errors.load
  - mostrar feedback al usuario si hay un error
  - de nuevo usando el pipe async, suscribirnos al observable con el array de datos para iterarlo

```html
  @if (tasksStore.getState().errors| async; as errors) {

    @if(errors.load) {
    <div class="error-info">
      <p>No se puede acceder al servidor</p>
      <p>{{errors.load}}</p>
    </div>
    } @else {

    <ul class="list">
      @for (item of tasksStore.getState().data| async; track item.id) {
      <li [title]="item.id" [id]="item.id">
        <isdi-task-card [item]="item" />
      </li>
      }
    </ul>

    }
  }
```

Como se ve, los componentes TasksAdd y TasksCard, ya no tienen asociados manejadores de eventos.
Ya no emitirán eventos sino que utilizarán directamente los métodos del store para modificar el estado

### Uso del servicio con estado en los componentes add y card

En ambos componentes ya no es necesario emitir eventos hacia arriba con un @Output() y el EventEmitter

En este caso se inyecta el servicio taskStore

Donde antes se emitía un evento (EventEmitter.next),
ahora se ejecuta un método del servicio, que a su vez emite un valor a través de su observable

Pos ejemplo, en el método handleAddTask del componente TaskAdd

```ts
  // ELIMINADO this.addEvent.next(newTaskData);
  this.tasksStore.addTask(newTaskData);
```

En realidad hemos pasado de

- emitir unos datos en el EventEmitter, que es una clase que extiende BehaviorSubject,
  que solo podían ser accedidos por el componente padre
- a emitir unas datos en un BehaviorSubject, encapsulado en una función de gestión de estado,
  de forma que los datos estarán disponibles para cualquier elemento de la aplicación que se haya suscrito al estado

De esta forma abstraemos el estado y controlamos quien pude modificarlo, aplicando el patrón Flux

### _Test del servicio con estado_

El método getState se testa suscribiéndose al resultado de ejecutarlo y comprobando que se reciben las valores iniciales de las propiedades del estado definidos en el servicio (initialState)

```ts
  const result = service.getState();
  result.data.subscribe((data) => expect(data).toEqual([]));
  result.errors.subscribe((errors) => expect(errors).toEqual({}));
```

Los metodos que gestionan el estado se testan

- moqueando el método del repo implicado de modo que devuelva datos
- ejecutando el método que queremos testar
- accediendo al estado mediante getState pasa suscribirnos a los datos
- comprobando en la suscripción que los datos recibidos son los que proporciono el mock del repo

```ts
  const mockTasks = [{ id: 1 }] as unknown as Task[];
  spyOn(TasksApiRepoService.prototype, 'getAll').and.returnValue(
    of(mockTasks)
  );
  service.loadTasks();
  service.getState().data.subscribe((data) => {
    expect(data).toEqual(mockTasks);
  });
```

En los casos de error el test es similar

- el método moqueado del repo lanza un error
- nos suscribimos a los errores

```ts
  const mockErrorMessage = 'Test error';
  spyOn(TasksApiRepoService.prototype, 'getAll').and.returnValue(
    throwError(() => new Error(mockErrorMessage))
  );
  service.loadTasks();
  service.getState().errors.subscribe((errors) => {
    expect(errors.load).toEqual(mockErrorMessage);
  });
```

## Gestión de errores centralizada. Interceptores

Los interceptors son funciones que, como indica su nombre interceptan las operaciones del servicio httpClient

- cuando se envía la **request** al servidor
- cuando se recibe la **response** desde el servidor

Creamos un interceptor para el segundo de estos casos, que centralizará el manejo de errores en la respuesta del backend

```shell
  ng g interceptor interceptors/error-handler --project demo-rx --dry-run
```

En Angular 17 los interceptors no son clases sino **funciones** que reciben dos parámetros (desde Angular)

- la request que se va a enviar al back, de forma que pueda ser modificada en el interceptor, e.g. añadiendo una cabecera con el token de autenticación
- una función next, que permite continuar el flujo de operaciones, pasando la request al siguiente interceptor o enviándola al backend en el último.

Vemos que se esta aplicando el patrón middleware de forma similar a como hace Express, por lo que se pueden utilizar sucesivos interceptor

```ts
  export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req);
  };
```

Para usarlo, basta indicarlo en el provider de httpClient que tenemos definido en app.config

```ts
  provideHttpClient(withFetch(), withInterceptors([errorHandlerInterceptor])),
```

Solo queda darle funcionalidad al interceptor modificando el Observable de HttpEvent devuelto por el next.

Para ello usaremos un pipe que ejecutará el operador catchError de RsJx como hasta ahora hacía el servicio CoursesApiRepoService en cada uno de sus métodos

```ts
  export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(catchError(handleError));
  };
```

El código del errorHandler es el mismo que ya teníamos en los repos, que ahora retiraremos de tasks.api.repo y de courses.api.repo, con la evidente ventaja de compartirlo en ambos y en cualquier otro repo que podamos añadir

```ts
  const handleError = (errorResponse: HttpErrorResponse) => {
    let errorMessage: string;
    if (errorResponse.status === 0) {
      errorMessage = `Se ha producido un error interno ${errorResponse.error}`;
    } else {
      errorMessage = `El Backend ha devuelto un código ${errorResponse.status} con el mensaje ${errorResponse.error}`;
    }
    return throwError(() => new Error(errorMessage));
  };

```
