type Publicacion = {
    id: string,
    titulo: string,
    contenido: string
}

export default async function Pagina(){

    const respuesta = await fetch("http://localhost:3000/api/publicacionXusuario", {cache: "no-store"})
    const datos = await respuesta.json()

    return(
        <section>
            <h2>Publicaciones de {datos.usuario.nombre}</h2>

            <section>
                {
                    datos.publicaciones.map((publicacion: Publicacion) => (
                        <section key = {publicacion.id}>
                         <h2 key = {publicacion.id}>{publicacion.titulo}</h2>
                         <p key = {publicacion.id}>{publicacion.contenido}</p>
                        </section>

                    ))
                }
            </section>
        </section>
    )
 
}