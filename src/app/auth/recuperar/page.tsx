"use client"

import { send } from "@emailjs/browser"
import { FormEvent, useRef, useState } from "react"

export default function Page(){

    const emailRef = useRef(null)
    const [mailEnviado, setEnviado] = useState(false)


    async function recuperarContrasena(evento: FormEvent){
        evento.preventDefault()

        /*Hago una peticion a mi ruta del backend para enviarle el mail 
         del usuario, y luego obtener la respuesta con los datos de la platilla */
        const respuesta = await fetch("http://localhost:3000/api/recuperar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //@ts-ignore
            body: JSON.stringify({email: emailRef.current?.value})
            //Le enviamos el email que obtenemos desde el input del formulario
        })

        if(respuesta.status != 200){
            alert ("Email no existe!")
            return
        }

        /*Obtenemos como respuesta de la peticion a nuestra ruta de back 
        los parametros para la platilla */
        const parametrosPlantilla = await respuesta.json()

        //Ejecutamos send, para enviar el mail de recuperacion
        send("service_x9zxxxo", //serviceID
            "template_6tuvt5h", // templateID
            parametrosPlantilla, //parametros
            "zEp9yRUw6VXdSQyUd"//Llave publica
        )      
        
        setEnviado(true)
    }

    return (
        <section>
        { //Si el emailEnviado no es true (no se envio), va a mostrar el form
            mailEnviado != true ? (

            <form onSubmit={recuperarContrasena} className="text-black">
                <input type="email" ref={emailRef} placeholder="Email de recuperacion"/>

                <input className="text-white" 
                type="submit" 
                value="Enviar email de recuperacion" />
            </form>

            ) : ( // Si el mail se envio, cambio la interfaz por:
                <h2>Mail enviado exitosamente! revisá tu correo</h2>
            )
        }
        </section>
    )

}