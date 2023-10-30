"use client"
import Link from "next/link"
import { FormEvent, useContext, useRef } from "react"
import Swal from "sweetalert2"


export default function FormularioLogin(){

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    //Funcion para enviar los datos que me llegan desde el formulario al Backend
    async function mandarDatosDeLogin(evento: FormEvent){ 
    //recibo el evento del formulario, de tipo FormEvent

        evento.preventDefault() //Prevengo el evento del formulario de recargar la pagina

        const datosAEnviar = {
          //@ts-ignore
          email: emailRef.current?.value,
          //@ts-ignore
          password: passwordRef.current?.value
        }

        console.log(datosAEnviar)

        //Ejecuto una peticion de tipo POST para enviar los datos a la ruta del back que realiza el inicio de sesion
        const respuesta = await fetch("http://localhost:3000/api/usuarios/login", {
          //Indico la ruta y configuracion de mi peticion
          method: "POST",
          headers: {
            //metadatos de la peticion que brindan un contexto 
            "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
          },
          body: JSON.stringify(datosAEnviar), //Envio la conversion a JSON de los datos a enviar 
        })

        //Manejo los posibles errores de la peticion

        if(respuesta.status == 400){
            const error = await respuesta.json() //Capturamos el error, que indicamos previamente en el Back      
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:   `${error.msg}`
            })
        }

        if(respuesta.status == 403){ //reenviarlo para registrarse
            const error = await respuesta.json()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:   `${error.msg}`,
                footer: '<a href="/auth/registrarse">Registrarse</a>'
              })
        }

        if(respuesta.status == 401){
          const error = await respuesta.json() //Capturamos el error, que indicamos previamente en el Back
         console.log()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:   `${error.msg}`,
            footer: '<a href="/auth/recuperar">Has olvidado tu contraseña?</a>'
          })
        }

        // //Si todo sale bien, obtengo el TOKEN que recibo del Back, contiene al usuario y la firma
        // const token = await respuesta.json()
        // //El token es igual a esperar que la respuesta se transforme a JSON
        // //Encierro el token en llaves para que me devuelva solamente el texto y no el objeto completo

        // // console.log(token)

        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesion exitoso',
            footer: '<a href="/auth/blogs">Ir Blogs</a>'
        })
    }

    return(
        <form onSubmit={mandarDatosDeLogin} className="text-black" action="">
            <input ref={emailRef} type="text" placeholder="Email"/>
            <input ref={passwordRef} type="password" placeholder="Contraseña" />

            <input type="submit" value="Ingresar" className="text-white"/>
        </form>
    )

}