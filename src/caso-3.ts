// EJEMPLO FOR IN en TS

const persona = {
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 25
}

for (let propiedad in persona) {
    console.log(propiedad);
    console.log(persona[propiedad]);
}