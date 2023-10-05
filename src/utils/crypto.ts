import { genSalt, hash } from "bcrypt"

export async function encriptarPassword (password: string){

    //Genero la cantidad de saltos (veces que se va a encriptar) que va  a hacer mi contraseña
    const cantidadDeSaltos = await genSalt(10)
    //Encripto/Hasheo mi contraseña
    const hashedPassword = await hash(password, cantidadDeSaltos)

    return hashedPassword

}