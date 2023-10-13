"use client"
import Link from "next/link"
import { FormEvent, useRef } from "react"
import {verify} from "jsonwebtoken"
import { UserContext } from "@/context/UserContext"
//Importamos el contexto que creamos
import { useContext } from "react"
//Importamos la funcion de react que nos permite acceder a nuestro contexto


export default function FormularioDeRegistro(){
  //Inicio las referencias para mis inputs
  const nombreRef = useRef(null)
  const edadRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const guardarDatosRef = useRef(null)

  const {user, setUser} = useContext(UserContext)
  //con useContext extraemos (desde UserContext), la variable user y la funcion setUser

  //Creo la funcion para enviar los datos que me llegan del formulario al Backend

  async function mandarDatosDeRegistro(evento: FormEvent){ 
    //recibo el evento del formulario, de tipo FormEvent

    evento.preventDefault() //Prevengo el evento del formulario de recargar la pagina

    const datosAEnviar = {
      //@ts-ignore
      nombre: nombreRef.current?.value,
      /*El signo de pregunta representa: si esto no es nulo, accede al value, 
      para prevenir el caso de que el input se encuentre vacío
      Al hacer esto, typeScript no reconoce el tipo de dato del input y tira un error.
      Ante esto ejecuto @ts-ignore para ignorar la correcion.
      Esto solo sucede al usar UseRef accediendo al valor de los inputs, 
      ya que TypeScript no sabe reconocer que se trata de un input, que  
      */

      //@ts-ignore
      edad : Number(edadRef.current?.value),
      //@ts-ignore
      email: emailRef.current?.value,
      //@ts-ignore
      password: passwordRef.current?.value
    }

    console.log(datosAEnviar)

    //Ejecuto una peticion de tipo POST para enviar los datos a la ruta del back que realiza el registro
    const respuesta = await fetch("http://localhost:3000/api/usuarios/register", {
      //Indico la ruta y configuracion de mi peticion
      method: "POST",
      headers: {
        //metadatos de la peticion que brindan un contexto 
        "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
      },
      body: JSON.stringify(datosAEnviar), //Envio la conversion a JSON de los datos a enviar 
    })

    //Manejo los posibles errores de la peticion
    if(respuesta.status != 201){
      const error = await respuesta.json() //Capturamos el error, que indicamos previamente en el Back
      alert(error.msg) //Lo mostramos, accediendo al atributo msg del objeto donde recibimos el error
    }

    //Si todo sale bien, obtengo el TOKEN que recibo del Back
    const {token} = await respuesta.json()
    //El token es igual a esperar que la respuesta se transforme a JSON
    //Encierro el token en llaves para que me devuelva solamente el texto y no el objeto completo

    console.log(token)

    //Decodificar/decifrar el token para extraer sus datos y utilizarlos en la pagina
    //Obtenemos el usuario a traves del token

    const usuarioDecodificado = verify( //ejecutamos verify
      token as string, //pasandole el token a decodificar
      process.env.NEXT_PUBLIC_TOKEN_SECRET as string 
      //y la variable de entorno que corresponde al Front
    )
    console.log(usuarioDecodificado)

    setUser({...datosAEnviar, token}) //Clono los datos para acceder solo a su contenido y no al objeto
    /*Establecemos/seteamos el usuario registrado (con sus datos y token) en el setUser.
    Así cargamos los datos del usuario en el Provider, donde todas las paginas que consuman este contexto,
    van a saber qué user corresponde al usuario que se registró*/

    //@ts-ignore
    if(guardarDatosRef.current?.value){//Si el contenido del input es true

      localStorage.setItem("usaurio", JSON.stringify(datosAEnviar))
      //Guardo en el localStorage los datos del usuario registrdo, en JSON

    } 
  }
  
  //HTML
  return(
    <>
      <form onSubmit={mandarDatosDeRegistro} className="text-black">
        {/*Le indico al form que, al momento de subirse, ejecute la funcion */}
      
        <input ref={nombreRef} type="text" placeholder="Nombre completo" />
        <input ref ={edadRef} type="number" inputMode="numeric" placeholder="Edad" />
        {/* Al indicar el inputMode en numeric, establezco que, cuando el usuario
         seleccione el input para completarlo, se abre el teclado numerico y no el normal*/}
        <input ref={emailRef} type="email" placeholder="Email"/>
        <input ref={passwordRef} type="password" placeholder="Contraseña"/>

        <input ref={guardarDatosRef} type="checkbox" className="text-white"/> Guardar Datos

        <input type="submit" value="Registrar" className="text-white"/>
      </form>

      <button onClick={() => console.log(user)}> Ver usuario </button>

      <Link href="/perfil" >Ir al perfil del usuario</Link>
    </>    
  )
}