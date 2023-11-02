import { PrismaClient } from "@prisma/client"
import { sign } from "jsonwebtoken"
import { encriptarPassword } from "@/utils/crypto"
import { passwordRegex } from "@/utils/regex"

const prisma = new PrismaClient

export async function POST(req:Request){

  const datos = await req.json()
  //Extraigo la nueva contraseña del usuario y el email

  console.log(datos)

  //verifico que la contraseña sea valida

  if(!datos.password.match(passwordRegex)){
    return new Response (JSON.stringify({msg: "Contraseña inválida, vuelva a intentarlo!"}), {status: 400})
  }

  //Encriptamos la nueva contraseña 
  const hashedPassword = await encriptarPassword(datos.password)

  //Cambio la contraseña en base al mail
  const updateUser = await prisma.usuario.update({
    where: {
      email: datos.email,
    },
    data: {
      password: hashedPassword,
    },
  })

  //Si todo sale bien devuelvo el usuario actualizado y status 201
  return new Response(JSON.stringify(updateUser), {status: 201})
}
    
