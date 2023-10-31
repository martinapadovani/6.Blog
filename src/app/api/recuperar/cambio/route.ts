import { PrismaClient } from "@prisma/client"
import { sign } from "jsonwebtoken"
import { encriptarPassword } from "@/utils/crypto"

const prisma = new PrismaClient

export async function POST(req:Request){

    const datos = await req.json()
    //Extraigo la nueva contraseña del usuario y el mial

    //Si hay un usuario, encriptamos la nueva contraseña 
    const hashedPassword = await encriptarPassword(datos.password)

    //Cambio la contraseña
    await prisma.usuario.update({
        where: { email: datos.email }, // Filtro para encontrar al usuario por su ID
        data: {
          password: hashedPassword // Campo a actualizar
        }
    });

    // if(!usuarioActualizado){//Si no existe un usuario con ese mail
    //     return new Response(JSON.stringify({msg: "Este usuario no existe!"}), {
    //         status: 400
    //     })
    // }

    //Si todo sale bien ve
    //return new Response(JSON.stringify({msg: "Contraseña cambiada con éxito"}), {status: 201})
    //Devuelvo el token, convertido a json
    
    
}
    
