
const userLogin = {
    usuarioWebId: 1,
    usuarioWebNombre: "admin",
    usuarioWebPerfiles: [
        {
            perfilId: 1,
            perfilNombre: "ADMINISTRADOR SISTEMA"
        },
        {
            perfilId: 2,
            perfilNombre: "ADMINISTRADOR WEB"
        },
        {
            perfilId: 3,
            perfilNombre: "USUARIO WEB"
        }
    ]
}

const isPerfilAdmin = (): boolean => {
    let isAdmin: boolean = false;
    if (userLogin !== undefined && userLogin !== null &&
        userLogin.usuarioWebPerfiles !== undefined && userLogin.usuarioWebPerfiles !== null) {
        let array: any[] = userLogin.usuarioWebPerfiles.filter(f =>
            f.perfilNombre === "ADMINISTRADOR SISTEMA" ||
            f.perfilNombre === "ADMINISTRADOR WEB"
        );
        if (array !== undefined && array !== null && array.length > 0) {
            isAdmin = true;
        }
    }
    return isAdmin;
}

console.log(isPerfilAdmin());