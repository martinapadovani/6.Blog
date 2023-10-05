
import { emailRegex, passwordRegex } from "@/utils/regex"
import { encriptarPassword } from "@/utils/crypto"
import { sign } from "jsonwebtoken"

import { PrismaClient} from "@prisma/client"
//Importamos PrismaClient desde la libreria @prisma/client

const prisma = new PrismaClient 


//Ruta de tipo POST para poder subir usuarios
export async function POST(req: Request) {
    //recibe una request (peticion), de tipo Resquest

    //Capturar los datos del cliente, que recibimos del usuario
    const usuario = await req.json()
    //Guardo en la variable usuario la transformacion de request a json

    console.log(usuario)//chequeo que los datos me llegan bien

    //Chequeo que se esten completando todos los datos
    if(Object.values(usuario).includes(undefined)){
        //Desde la clase Objetc obtengo un arreglo con los valores correspondientes a de usuario
        //Si alguno de los valores incluye undefined (no se definio el campo)

        //Devuelvo 400 Bad Request, ya que es una mala peticion
        return new Response ("Error! Faltan datos", {status: 400})
    }

    //VALIDO LOS DATOS, que coincidan con su formato
    if(!usuario.email.match(emailRegex)) {
        //si el email ingresado no corresponde con el REGEX
        return new Response ("Error! email invalido", {status: 400})
    }

    if(!usuario.password.match(passwordRegex)){
        return new Response ("Error! contraseña invalida", {status: 400})
    }

    //Encripto mi contraseña
    const hashedPassword = await encriptarPassword(usuario.password)

    console.log(hashedPassword)


    const usuarioAGuardar = {... usuario, password: hashedPassword} //clono el usuario pero cambio la contraseña que recibo por la Hashead

    //Guardo el usuario en la DB
    const usuarioSubido = await prisma.usuario.create({data: usuarioAGuardar})

    if (!usuarioSubido) return new Response ("No se pudo subir el usuario", {status: 500})

    //Guardo un token/firma digital
    const token = sign(usuarioAGuardar, process.env.TOKEN_SECRET as string)

    const respuesta = {... usuarioAGuardar, token}

    
    return new Response(token, {status: 201})//Devuelvo el token
}





