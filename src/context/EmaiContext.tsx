"use client"
//@ts-ignore

import { createContext, useState } from "react"

export const EmailContext = createContext({} as any);

export function EmailProvider({children} : {children: React.ReactNode}){
    //Es un componente de páginas, similar al Layout, por lo tanto recibe "children".

    const [email, setEmail] = useState() //manejar el estado relacionado con ese contexto.
    /*Creamos un estado que contiene:
     - El estado que contiene los datos (del usuario)
     - La funcion que nos permite interactuar con los datos
    */

    /*Devuelve un componente llamado UserContext.Provider, que contienee children, es decir, las páginas.
    El provider recibe un prop llamado value, que es un objeto que contiene user y setUser. 
    Al envovler children, value estará disponible para los componentes que consuman este contexto.
    Los componentes que están dentro de este proveedor tendran acceso a user y setUser.
    */
    return (
       <EmailContext.Provider value={{email, setEmail}}>
           {children}
       </EmailContext.Provider>
   )
}