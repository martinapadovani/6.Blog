"use client"

import { send } from "@emailjs/browser"
import { FormEvent, useRef } from "react"




export default function Page(){

    const emailRef = useRef(null)

    async function recuperarContrasena(evento: FormEvent){

        const respuesta = await fetch("http://localhost:3000/api/recuperar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //@ts-ignore
            body: JSON.stringify({email: emailRef.current?.value})
        })
        //Obtengo la respuesta 

        if(respuesta.status != 200){
            alert ("Email no existe!")
        }

        const email = await respuesta.json()

        //Ejecutamos send, apra enviar el mail de recuperacion
        send("service_fpnggtv", //serviceID
            "template_6tuvt5h", // templateID
            email, //parametros
            "zEp9yRUw6VXdSQyUd"//Llave publica
        )       
        
    }

    return (

        <section>
            <form onSubmit={recuperarContrasena}>
                <input type="email" ref={emailRef} placeholder="Email de recuperacion"/>

                <input className="text-white" type="submit" value="Enviar email de recuperacion" />
            </form>
        </section>
    )

}