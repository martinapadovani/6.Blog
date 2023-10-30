
import { emailRegex, passwordRegex } from "@/utils/regex"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"
//Importo la función compare desde BCrypt
import { sign } from "jsonwebtoken"

const prisma = new PrismaClient()

export async function POST(req: Request){

    //Recuperar los datos ingresados, por parte de la peticion
    const usuario = await req.json()

    //Validar Datos, correspondiente a su formato
    if(!usuario.email.match(emailRegex)){
        return new Response (JSON.stringify({msg:"Email inválido"}), {status: 400})
    }

    if(!usuario.password.match(passwordRegex)){
        return new Response (JSON.stringify({msg: "Contraseña invalida"}), {status: 400})
    }

    //Verificar si la cuenta existe
    const usuarioEnDB = await prisma.usuario.findUnique({
        //Obtengo el usuario guardado en la DB

        //Le indico donde o en base a qué parametro va a buscar al usuario
        where: {
            email: usuario.email
            //Donde el email de la DB sea igual al recibido desde el cliente
        }
    })

    if(!usuarioEnDB){ //Si no hay un usuario en la DB que contenga el mail ingresado
        return new Response (JSON.stringify({msg: "No existe una cuenta asociada a ese mail!"}), {status: 403})
        // 403:
    }

    //Validar Constraseña
    const contrasenaValida = await compare(
        usuario.password, 
        usuarioEnDB.password
    )

    if(!contrasenaValida)
    return new Response (JSON.stringify({msg: "Contraseña incorrecta"}), {status: 401})
    //401 Unauthorized 


    const token = sign (usuarioEnDB, process.env.TOKEN_SECRET as string, {
        expiresIn: "7d" //Puedo indicar en cuanto tiempo expira el token
    })

    return new Response (JSON.stringify({token}), {status: 201})
}