import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


export async function GET(request: Request, {params} : {params: {email: string}}) { 

    const usuario = await prisma.usuario.findUnique({
        where: {
            email: params.email,
        },
    })

    const publicacionesUsuario = await prisma.publicacion.findMany({
        where: {
            usuarioEmail: params.email
        }
    })

    const resultado = {
        usuario,
        publicaciones: publicacionesUsuario,
    };


    return new Response (JSON.stringify(resultado))

}