# Casos

-  1 - [Uso de funciones en SCSS](#1---uso-de-funciones-en-scss)
-  2 - [Anidar clases en SCSS](#2---anidar-clases-en-scss)
-  3 - [Uso de forkJoin en Angular](#3---uso-de-forkjoin-en-angular)
-  4 - [Simplificar filtros](#4---simplificar-filtros)
-  5 - [Uso del for of](#5---uso-del-for-of)
-  6 - [Mal uso del Var](#6---mal-uso-del-var)
-  7 - [Variables declaradas para un uso de const](#7---variables-declaradas-para-un-uso-de-const)
-  8 - [Uso de método map de los arreglos](#8---uso-de-método-map-de-los-arreglos)
-  9 - [Uso de find en lugar de filter](#9---uso-de-find-en-lugar-de-filter)

## 1 - Uso de funciones en SCSS

### Incorrecto ❌

```scss

.mat-column-100{
    flex : 0 0 100px !important;
}

.mat-column-120{
    flex : 0 0 120px !important;
}

.mat-column-140{
    flex : 0 0 140px !important;
}

```

### Correcto ✅

```scss

@for $i from 100 through 140 step 20 {
    .mat-column-#{$i}{
        flex : 0 0 #{$i}px !important;
    }
}

/*
    .mat-column-100 {
        flex: 0 0 100px !important;
    }

    .mat-column-120 {
        flex: 0 0 120px !important;
    }

    .mat-column-140 {
        flex: 0 0 140px !important;
    }
*/

```

```scss

// Tambien podemos añadir Operadores
@for $i from 1 through 10 {
  .mat-column-#{$i * 20} {
    flex: 0 0 #{$i *20}px !important;
  }
}

/*
    .mat-column-20 {
        flex: 0 0 20px !important;
    }

    .mat-column-40 {
        flex: 0 0 120px !important;
    }

    ...

    .mat-column-200 {
        flex: 0 0 140px !important;
    }
*/

```


## 2 - Anidar clases en SCSS

### Incorrecto ❌

```scss

.card{
    max-width: 10rem;
    margin-bottom: 1rem;    
}

.card .header{
    background-color: #f5f5f5;
    padding: 1rem;
}

.card .body{
    padding: 1rem;
}

.card .body:hover{
    background-color: #c1c1c1;
}

.card .footer{
    background-color: #f5f5f5;
    padding: 1rem;
}

```

### Correcto ✅

```scss

.card{
    max-width: 10rem;
    margin-bottom: 1rem;    

    .header{
        background-color: #f5f5f5;
        padding: 1rem;
    }

    .body{
        padding: 1rem;

        &:hover{
            background-color: #c1c1c1;
        }

    }

    .footer{
        background-color: #f5f5f5;
        padding: 1rem;
    }
}

```

## 3 - Uso de forkJoin en Angular

### Incorrecto ❌

```typescript

const observable1 = this.http.get('url1');
const observable2 = this.http.get('url2');
const observable3 = this.http.get('url3');

observable1.subscribe(response1 => {
    observable2.subscribe(response2 => {
        observable3.subscribe(response3 => {
            console.log(response1);
            console.log(response2);
            console.log(response3);
        });
    });    
});

```

### Correcto ✅

```typescript

import { forkJoin } from 'rxjs';

const usuarios = this.http.get('url1');
const empresas = this.http.get('url2');
const zonas = this.http.get('url3');

forkJoin([usuarios, empresas, zonas])
    .subscribe(([resUsuarios, resEmpresas, resZonas]) => {
        console.log(resUsuarios);
        console.log(resEmpresas);
        console.log(resZonas);
    });

```

## 4 - Simplificar filtros

### Incorrecto ❌

![Alt text](<recursos/apply_filter.jpeg>)

### Correcto ✅

```typescript
applyFilter(filterValue: string | null) {
    this.dataSource.filter = filterValue?.trim().toLowerCase();
}
```

## 5 - Uso del for of

### No recomendado ❌

![Alt text](recursos/forindex.jpeg)

```typescript
for (let index = 0; index < this.array.length; index++) {
    const element = this.array[index];
    console.log(element,index);   
}
```

### Recomendado ✅

```typescript
for (const element of this.array) {
    console.log(element);
}
```

```typescript
for (const [element,index] of this.array.entries()) {
    console.log(element,index);
}
```

```typescript
for (const trabajador of this.listTrabajadores) {

    const detalles = this.listDetalleTrabajadores.filter(x => x.codigo === trabajador.codigo);

    for (const detalle of detalles){
        trabajador[detalle.fecha] = tipoReporte == 1? detalle.jornada : detalle.tarea
    }

    for (const cabecera of this.fechasCabecera){
        const fechaData = trabajador[cabecera.fecha]
        if(!fechaData || fechaData < 0){
            trabajador[cabecera.fecha] = 0
        }
    }
    
}

this.fechasCabecera.reverse()
```

## 6 - Mal uso del Var

### No recomendado ❌

![Alt text](recursos/var_1.jpeg)

![Alt text](recursos/var_2.jpeg)

![Alt text](recursos/var_3.jpeg)

### Recomendado ✅

```typescript
const obj = {
    label:'xxxxx',
    def: mo(),
    classHead:'mat-column-100'
}
this.display.push(obj)
```

```typescript
this.display.push({
    label:'xxxxx',
    def: mo(),
    classHead:'mat-column-100'
})
```

```typescript
forkJoin([
    this.utilsService.listarComboProduccion$({ option:8 })
    this.utilsService.listarComboProduccion$({ option:9 })
]).subcribe(([]))

```

## 7 - Variables declaradas para un uso de const

### No recomendado ❌

![Alt text](recursos/let-const.jpeg)
```typescript
this.cartografiaGeoJsonFull.features = []
const resultCartografia = result[0].data
resultCartografia.forEach(element => {
  let item: any = {
    type: "Feature",
    properties: {
      clave: element.clave,
      nivel: element.nivel
    },
    geometry: JSON.parse(element.geojson)
  }
  this.cartografiaGeoJsonFull.features.push(item)
})

console.log(this.cartogradiaGeoJsonFull)
```

### Recomendado ✅

```typescript
this.cartografiaGeoJsonFull.features = []
const resultCartografia = result[0].data
resultCartografia.forEach(element => {
  const item = {
    type: "Feature",
    properties: {
      clave: element.clave,
      nivel: element.nivel
    },
    geometry: JSON.parse(element.geojson)
  }
  this.cartografiaGeoJsonFull.features.push(item)
})

console.log(this.cartogradiaGeoJsonFull)
```
```typescript
this.cartogradiaGeoJsonFull.features = result[0].data
    .map(element=>({
        type:'Faeature',
        properties:{
            clave:element.clave,
            nivel:element:nivel
        },
        geometry: JSON.parse(element.geojson||'{}')
    }))

console.log(this.cartogradiaGeoJsonFull)
```

## 8 - Uso de método map de los arreglos

### No recomendado ❌

```typescript

const list = []
for (const element of this.list) {
    const item = {
        id: element.id,
        name: element.name,
        age: element.age
    }
    list.push(item)
}

```

### Recomendado ✅

```typescript

const list = this.list.map(element => ({
    id: element.id,
    name: element.name,
    age: element.age
}))

```

## 9 - Uso de find en lugar de filter

### No recomendado ❌

```typescript

const item = this.list.filter(element => element.id === 1)[0] || 10
if(item){
    console.log(item)
}

```

### Recomendado ✅

```typescript
const item = this.list.find(element => element.id === 1) || 10

if(item){
    console.log(item)
}
```

## 10 - Uso de || para asignar valores por defecto

### No recomendado ❌

```typescript
const name = this.user.name ? this.user.name : 'Sin nombre'
```

### Recomendado ✅

```typescript
const name = this.user.name || 'Sin nombre'
```

## 11 - Uso de Destructuring

### No recomendado ❌

```typescript
this.formGroupFilter = this.fb.group({
    fundoID: [-1], 
    moduloID: [-1], 
    loteID: [-1], 
})

this.formGroupFilter.controls.fundoID.valueChange(valor=>{
    this.modulosFiltered = listaModulos.filter(modulo=> 
        +valor === modulo.fundoID
    )
})

this.formGroupFilter.controls.moduloID.valueChange(valor=>{
    this.lotesFiltered = listaLotes.filter(lote=>
        this.formGroupFilter.controls.value.fundoID === lote.fundoID && 
        +valor === lote.moduloID
    )
})

this.formGroupFilter.controls.loteID.valueChange(valor=>{
    this.variedadesFiltered = listaVariedades.filter(variedad=>
        this.formGroupFilter.controls.value.fundoID === lote.fundoID && 
        this.formGroupFilter.controls.value.moduloID === lote.moduloID && 
        +valor = lote.id
    )
})
```

### Recomendado ✅

```typescript
this.formGroupFilter = this.fb.group({
    fundoID: [-1], 
    moduloID: [-1], 
    loteID: [-1], 
})

const {controls, value} = this.formGroupFilter

controls.fundoID.valueChange(fundoID=>{
    this.modulosFiltered = listaModulos.filter(modulo=> 
        +fundoID === modulo.fundoID
    )
})

controls.moduloID.valueChange(moduloID=>{
    this.lotesFiltered = listaLotes.filter(lote=>
        value.fundoID === lote.fundoID && 
        +moduloID === lote.moduloID
    )
})

controls.loteID.valueChange(loteID=>{
    this.variedadesFiltered = listaVariedades.filter(variedad=>
        value.fundoID === variedad.fundoID && 
        value.moduloID === variedad.moduloID && 
        +loteID = lote.id
    )
})
```

## 12 - Uso de Map y Set (Diccionarios) optimizar bucles

### No recomendado ❌

```typescript
const lotes = [{id:1, nombre:'lote 01', modulo:'MOD01'}, {id:2, nombre:'lote 02', modulo:'MOD02'}, ...] // 300 elementos
const evaluaciones = [{id:100, loteID:1, fecha:'15/07/2023', lote:}, {id:100, loteID:1, fecha:'15/07/2023'}, ...] // 1000 elementos

//* Añadimos los datos de los lotes a las evaluaciones
// Esto generaria 300*1000 ITERACIONES
for(let evaluacion of evaluaciones){
    //const lote = lotes.filter(lote=>lote.id===evaluacion.loteID)[0] // Otro error común
    const lote = lotes.find(lote=>lote.id===evaluacion.loteID) // frena la iteración hasta encontrar conincidencia
    evaluacion.lote = lote
    evaluacion.moduloNombre = lote.modulo
}

```

### Recomendado ✅

```typescript
const lotes = [{id:1, nombre:'lote 01', modulo:'MOD01'}, {id:2, nombre:'lote 02', modulo:'MOD02'}, ...] // 300 elementos
const evaluaciones = [{id:100, loteID:1, fecha:'15/07/2023'}, {id:100, loteID:1, fecha:'15/07/2023'}, ...] // 1000 elementos

// OPCION 1
const lotesMap = new Map()
for(const lote of lotes){ lotesMap.set(lote.id, lote) }

// OPCION 2
const lotesMap = new Map(lotes.map(lote=>[lote.id, lote]))

//* Añadimos los datos de los lotes a las evaluaciones
for(const evaluacion of evaluaciones){
    const lote = lotesMap.get(evaluacion.loteID)
    evaluacion.lote = lote
    evaluacion.moduloNombre = lote.modulo
}
```

### Uso del Set() 

```typescript

const planillas = [
    {id:1, codTrabajador:'123', fecha:'15/07/2023'},
    {id:1, codTrabajador:'123', fecha:'14/07/2023'},
    {id:1, codTrabajador:'123', fecha:'13/07/2023'},
    {id:1, codTrabajador:'333', fecha:'15/07/2023'},
    {id:1, codTrabajador:'666', fecha:'12/07/2023'},
    {id:1, codTrabajador:'111', fecha:'14/07/2023'},
    ...
    {id:1, codTrabajador:'111', fecha:'14/07/2023'},
] // 300 elementos

// OPCION 1
const trabajadoresSet = new Set()
for(const planilla of planillas){ trabajadoresSet.add(planilla.codTrabajador) }

// OPCION 2
const trabajadoresSet2 = new Set(planillas.map(x=>x.codTrabajador))

// 123,333,666,111
console.log('Esta semana trabajaron: ', trabajadoresSet.size, 'trabajador(es)' )

const juanCod = '123'
const estaJuan = trabajadoresSet.has(juanCod) // boolean
console.log('Esta Juan Trabajando?: ', estaJuan ? 'SI' : 'NO' )


```