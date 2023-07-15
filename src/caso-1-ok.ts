
const casos = [
    '99=Error al guardar trabajadores',
    '0=Trabajadores guardados correctamente',
    '-1=Trabajadores cesados',
    '1=Trabajadores migrados = 3'
]

const results: {
    ok: boolean,
    code: string,
    message: string
}[] = []

for (const messageResult of casos) {
    const [code, ...messageSplit] = messageResult.split('=');
    const ok = code !== '99' && Number(code) >= 0;
    const message = messageSplit.join('=');
    results.push({ ok, code, message })
}

console.table(results)