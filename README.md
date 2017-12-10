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

