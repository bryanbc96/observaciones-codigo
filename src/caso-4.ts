const a = {
    fecha: new Date(),
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 25
}

const b = structuredClone(a)

b.apellido = 'Lopez'