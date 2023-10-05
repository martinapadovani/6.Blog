
import { emailRegex, passwordRegex } from "@/utils/regex"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

const prisma = new PrismaClient()


export async function POST(req: Request){

    //Recuperar Datos por parte de la peticion

    const usuario = await req.json()

    //Validar Datos, corresponden a su formato

    if(!usuario.email.match(emailRegex)){
        return new Response ("Email inválido", {status: 400})
    }

    if(!usuario.password.match(passwordRegex)){
        return new Response ("Contraseña inválido", {status: 400})
    }

    //Verificar si la cuenta existe

    const usuarioEnDB = await prisma.usuario.findUnique({
        //Obtengo el usuario guardado en la DB

        //le indico donde o en base a que parametro va a buscar al usuario
        where: {
            email: usuario.email
            //Donde el email de la DB sea igual al recibido desde el cliente
        }
    })

    if(!usuarioEnDB){
        return new Response ("cuenta inexistente", {status: 403})
    }


    //Validar Constraseña

    const contrasenaValida = await compare(
        usuario.password, 
        usuarioEnDB.password
    )

    if(!contrasenaValida)
    return new Response ("contraseña inválida", {status: 401})

    const token = sign (usuarioEnDB, process.env.TOKEN_SECRET as string, {
        expiresIn: "7d"
    })

    return new Response(token, {status: 201})
}