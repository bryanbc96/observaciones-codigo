
const casos = [
    '99=Error al guardar trabajadores',
    '0=Trabajadores guardados correctamente',
    '-1=Trabajadores cesados',
    '1=Trabajadores migrados = 3'
]

const results: {
    ok: boolean,
    message: string
}[] = []

for (const messageResult of casos) {

    const messageSplit = messageResult.split('='); // [1,Trabajadores migrados , 3]
    const code = messageSplit[0]
    const ok = code !== '99' && Number(code) >= 0;
    messageSplit.shift()
    const message = messageSplit.join('=');
    
    results.push({ ok, message })

}

console.table(results)