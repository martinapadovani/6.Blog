"use client"

import { EmailContext } from "@/context/EmaiContext"
import { send } from "@emailjs/browser"
import { FormEvent, useRef, useState } from "react"
import Swal from "sweetalert2"
import { useContext } from "react"

export default function Page(){

    const emailRef = useRef(null)
    const [mailEnviado, setEnviado] = useState(false)

    //Importo el Contexto
    const {email, setEmail} = useContext(EmailContext)

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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:   'No se encontré cuenta una asociada a ese email'
              })
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

        //@ts-ignore
        console.log(emailRef.current?.value)

        //Obtengo el mail ingresado por el usuario
        //@ts-ignore
        setEmail(emailRef.current?.value)
        //Lo ingreso como valor de "email" en el contexto
        
        Swal.fire({
            icon: 'success',
            title: 'Email enviado'
        })
    }

    return (
        
        <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            { //Si el emailEnviado no es true (no se envio), va a mostrar el form
            mailEnviado != true ? (

            <form onSubmit={recuperarContrasena} className="text-black">

                <div>
                  <label htmlFor="email" className="block text-m font-medium leading-6 text-white">
                        Email de recuperacion
                  </label>
                  <div className="mt-5">
                    <input ref={emailRef}
                      type="email" 
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="mt-3">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Enviar email de recuperacion
                    </button>
                </div>

                {/* <input type="email" ref={emailRef} placeholder="Email de recuperacion"/>

                <input className="text-white" 
                type="submit" 
                value="Enviar email de recuperacion" /> */}
            </form>

            ) : ( // Si el mail se envio, cambio la interfaz por:
                <h2>Mail enviado exitosamente! revisá tu correo</h2>
            )
        }
        </section>
    )

}