# Cookbook AngularJS: ¿Cómo obtener datos desde una API REST y mostrar los datos sin morir en el intento?

## Seguir los pasos de la documentación oficial de AngularJS para crear una app a traves de AngularCLI

[https://angular.io/guide/quickstart]

Esto generará una nueva aplicación AngularJS con el contenido necesario para poder arrancar tu proyecto


### 1. Binding de propiedades en Angular JS
Gracias al binding de datos que hace angular entre sus controladores y vistas (.html y .ts) es posible definir propiedades a una clase y luego poder consumir esas propiedades directamente en el .html)

```typescript
// app.component.ts (controller)
export class AppComponent  {
  title = 'mi aplicación'; 
```

```

<!-- app.component.html VISTA -->
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
```

Esta vinculación de datos (binding) entre la vista y el controlador persiste en tiempo de ejecución. Es por esto que si cambia el valor de la propiedad durante la ejecución de la aplicación, esta misma se verá reflejada en la vista

### 2. Consumir datos de una API REST

Para poder consumir datos de una api se utilizará el modulo fetch [https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Utilizando_Fetch]

```
npm install --save @types/node-fetch
```

Para poder ejecutar la obtención de datos vamos a utilizar la interfaz OnInit que provee angularjsi [https://docs.angularjs.org/guide/component]. Este método se llamará al iniciar el componente. Dentro de este componente vamos a obtener los datos de una API. Para este caso utilizaremos una mock-api a traves de la herramienta mockeable.io [https://www.mockable.io], que permite generar una api mock de forma simple y rapida. Esta API devuelve un json con la siguiente información:

```
{
  "items": [
    {
      "title": "title1"
    },
    {
      "title": "title2"
    }
  ]
}
```


```typescript
// app.component.ts (controller)
export class AppComponent implements OnInit {
  title = 'mi aplicación';
  items = [] <-- vamos a almacenar los datos en esta propiedad

  // este metodo es llamado al inicializarse el componente
  ngOnInit() {
    const url = 'http://demo2559707.mockable.io/data';
    // obtengo datos utilizando fetch
    fetch(url).then(response => response.json()).then(data => {
      this.items = data.items; // <-- asigno los valores a la propiedad del componente
    });
  }

```

```
  <!-- app.component.html -->
  <li *ngFor="let item of items">
    <h2 >{{item.title}}</h2>
  </li>
```

### Bonus: Busquedas sobre listado

Podemos aprovechar las habilidades de binding de angular para generar una busqueda en tiempo real sobre los valores traidos. Para esto debemos utilizar los componentes de Pipe que provee angular 2. [https://angular.io/guide/pipes]

Para esto debemos primero definir que transformacion va a realizar el pipe. Esto se logra implementando la interfaz de Pipe que provee angular. En este caso vamos a recibir como primer parametro el listado de items a filtrar y como segundo parámetro el valor que se utilizará como filtro.

```
//MyFilter.ts
@Pipe({
  name: 'myFilter'

})

@Injectable()
export class MyFilter implements PipeTransform {
  transform(items: any[], arg: string): any {
    if (!items)
      return []
    return items.filter( item => item.title.indexOf(arg) >= 0);
  }
}
```

Una vez definido el pipe se debe declarar el mismo, una forma posible es declararlo de forma global para que este disponible en el resto de la aplicación. La declaración se deberá realizar en el archivo .module del componente app (el principal).

```
import { AppComponent } from './app.component';
import { MyFilter} from "./myfilter.ts";


@NgModule({
  declarations: [
    AppComponent
    MyFilter
  ],

```

Nos queda la configuración de la vista del componente para poder disparar los eventos de sobre el cambio de valores en el campo de búsqueda de la aplicación. Para esto debemos realizar un binding de ventos sobre el campo de búsqueda (https://angular.io/guide/user-input).

```
<input (input)="onSearchChange($event.target.value)" />
```

Con esto estamos indicando que cuando cambie el valor del elemento <input> se llamará al método onSearchChange del componente.

```

// app.component.ts (controller)
export class AppComponent implements OnInit {

  onSearchChange(value) {
    this.searchText = value;
  } 


```

Por último nos queda indicar el filtro a aplicar sobre el listado para que angular pueda realizar el binding sobre el pipe definido.


```
  <li *ngFor="let item of items | myFilter: searchText">
```

Agregando | myFilter : searchText al componente <li> estamos aplicando el filtro llamado myFilter a la propiedad items utilizando como argumento de filtro la propiedad searchText del componente App.



