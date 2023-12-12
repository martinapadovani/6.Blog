
import { PrismaClient } from "@prisma/client"
import { sign } from "jsonwebtoken"
import {send} from "@emailjs/browser"

const prisma = new PrismaClient

export async function POST(req:Request){

    const datos = await req.json()
    //Extraigo el email del usuario

    const usuario = await prisma.usuario.findUnique({
        where: {email: datos.email}
    })
    //Busco el usuario correspondiente al email que obtuvimos

    if(!usuario){//Si no existe un usuario con ese mail
        return new Response(JSON.stringify({msg: "Este usuario no existe!"}), {
            status: 400
        })
    }

    //Si hay un usuario generamos un token unico para la recuperacion de su cuenta
    const tokenMail = sign(
        datos.email, 
        process.env.TOKEN_SECRET as string, 
        {}
    )
    /*  Ejecutamos la funcion sign para crear un token con el email, 
        encriptado en base a variable de entorno 
    */   

    const parametrosPlantilla = { 
        //Completamos los parametros para la plantilla del mail
        asunto: "Recupera tu contraseña",
        from_name: "OcktoCall",
        to_name: usuario.nombre,
        link: `http://localhost:3000/auth/recuperar/${tokenMail}`, 
        user_email: datos.email
    }

    return new Response(JSON.stringify(parametrosPlantilla))
}

