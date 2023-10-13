import { genSalt, hash } from "bcrypt"
//Importo genSalt, para generar la cantidad de saltos
//Importo hash para encriptar la contraseña

export async function encriptarPassword (password: string){

    /*Genero la cantidad de saltos (veces que se va a encriptar) que va a hacer mi contraseña, 
    para llegar a su version encriptada (Hash) */
    const cantidadDeSaltos = await genSalt(10)

    //Encripto/Hasheo mi contraseña
    const hashedPassword = await hash(password, cantidadDeSaltos)
    //Hash recibe la contraseña y la cantidad de saltos.

    return hashedPassword
}



