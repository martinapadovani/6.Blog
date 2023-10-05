import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


export async function PUT(req: Request){

    //Obtengo el usuario actualizado desde la request
    const usuarioActualizado = await req.json()

    // //Obtengo el usuario en la DB
    // const usuariosDB = await prisma.usuario.findUnique(usuarioActualizado.id)

    const usuariosDB = await prisma.usuario.update({
        where: { email: usuarioActualizado.email},
        data: { activo: usuarioActualizado.activo }
    });


    return new Response(JSON.stringify(usuariosDB))
}