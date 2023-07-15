# Casos

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


## 2 - Anidar clases en SCSS

### Incorrecto ❌

```scss

.card{
    max-width: 10rem;
    margin-bottom: 1rem;    
}

.card.header{
    background-color: #f5f5f5;
    padding: 1rem;
}

.card.body{
    padding: 1rem;
}

.card.body:hover{
    background-color: #f5f5f5;
}

.card.footer{
    background-color: #f5f5f5;
    padding: 1rem;
}

```

### Correcto ✅

```scss

.card{
    max-width: 10rem;
    margin-bottom: 1rem;    

    &.header{
        background-color: #f5f5f5;
        padding: 1rem;
    }

    &.body{
        padding: 1rem;

        &:hover{
            background-color: #f5f5f5;
        }

    }

    &.footer{
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

### Recomendado ✅

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