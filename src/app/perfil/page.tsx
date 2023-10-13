"use client"
import { UserContext } from "@/context/UserContext"
import {useContext} from "react"
import Link from "next/link"

export default function Page(){
    const {user} = useContext(UserContext)

    return(
        <section className="perflil">

            <h2>Nombre: {user.nombre}</h2>

            <p> Edad: {user.edad}</p>
            <p>Email: {user.email}</p>
            <p>Contraseña: {user.password}</p>

            <Link href="/auth/registrarse">Volver</Link>
    
        </section>
    )
}

