"use client"
//@ts-ignore
import { createContext, useState } from "react"
//Importamos las funciones necesarias

//Creamos el "almacen de datos", el contexto
export const UserContext = createContext({} as any);
//Exportamos una constante que va a contener el contexto de los datos del usuario
//Lo inicializo con un objeto vacío como valor predeterminado, en caso de que no se encuentra un proveedor.

/*Creamos el proveedor que va a contener las páginas
y proveerlas de un contexto con los datos (del usuario) a los que necesitan acceder*/
export function UserProvider({children} : {children: React.ReactNode}){
    //Es un componente de páginas, similar al Layout, por lo tanto recibe "children".

    const [user, setUser] = useState() //manejar el estado relacionado con ese contexto.
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
       <UserContext.Provider value={{user, setUser}}>
           {children}
       </UserContext.Provider>
   )
}
