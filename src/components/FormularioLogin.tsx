"use client"
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

      if(respuesta.status == 201){
    
        Swal.fire({
          icon: 'success',
         title: 'Inicio de sesion exitoso',
         footer: '<a href="/auth/blogs">Ir Blogs</a>'
        })

      }

      //@ts-ignore
      passwordRef.current.value = ""
      //@ts-ignore
      emailRef.current.value = ""
    }

  return(

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Sign in to your account
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form  onSubmit={mandarDatosDeLogin} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email address
            </label>
            <div className="mt-2">
              <input ref={emailRef}
                type="email"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Password
              </label>
              <div className="text-sm">
                <a href="/auth/recuperar" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input ref={passwordRef}
                type="password"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          No account?{' '}
          <a href="/auth/registrarse" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )

}