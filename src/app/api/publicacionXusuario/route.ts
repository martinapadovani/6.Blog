import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


export async function GET() { 

    const usuario = await prisma.usuario.findUnique({
        where: {
            email: "martinapadovani@gmail.com",
        },
    })

    const publicacionesUsuario = await prisma.publicacion.findMany({
        where: {
            usuarioEmail: "martinapadovani@gmail.com"
        }
    })

    const resultado = {
        usuario,
        publicaciones: publicacionesUsuario,
    };

    return new Response (JSON.stringify(resultado))

}