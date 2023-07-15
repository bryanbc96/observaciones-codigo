
const userLogin: any = {
    usuarioWebId: 1,
    usuarioWebNombre: "admin",
    usuarioWebPerfiles: [
        // {
        //     perfilId: 1,
        //     perfilNombre: "ADMINISTRADOR SISTEMA"
        // },
        // {
        //     perfilId: 2,
        //     perfilNombre: "ADMINISTRADOR WEB"
        // },
        {
            perfilId: 3,
            perfilNombre: "USUARIO WEB"
        }
    ]
}

const isPerfilAdmin = (): boolean => {
    return (
        userLogin?.usuarioWebPerfiles?.some(
            (perfil) =>
                perfil.perfilNombre === "ADMINISTRADOR SISTEMA" ||
                perfil.perfilNombre === "ADMINISTRADOR WEB"
        ) ?? false
    );
}

console.log(isPerfilAdmin());