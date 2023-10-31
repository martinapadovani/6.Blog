import Image from 'next/image'
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from 'next/link'

export default function ListaDeBlogs() {
    
    //Guardo en una variable la ubicacion de la carpeta que contiene los blogs
    const direccionDeMisBlogs = "src/blogs"

    //Leer el contenido de la carpeta /blogs y guardar los nombres de sus archivos en un arreglo
    const archivos = fs.readdirSync(path.join(direccionDeMisBlogs))

    //Leer los archivos
    const blogs = archivos.map((archivo => {
        //mapeo mi arreglo con los archivos mdx donde por cada uno:
        
        //Leo el contenido de un archivo en formato UTF-8 que se encuentra en la carpeta "blogs"
        const contenidoDelArchivo = fs.readFileSync(path.join(direccionDeMisBlogs, archivo), "utf-8") 
        
        //Analizo los metadatos delanteros del archivo y los extraigo en la variable frontMatter   
        const { data: frontMatter } = matter(contenidoDelArchivo)
 
        return { //Devuelvo el objeto con
            meta: frontMatter, //atributo meta igual a los metadatos obtenidos
            slug: archivo.replace(".mdx", "")
            //texto que viene después del nombre de dominio y hace parte del enlace que conduce hacia el blog
         }
    }))

    return (

        <ul>
            {//Itero todos los blogs para mostrarlos con un formato html indicado
             blogs.map((blog, index) =>(

                <article key={index}
                  className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6
                  flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-10 sm:mx-auto sm:w-full sm:max-w-sm "
                >
                  <a href="#">
                    <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                        {blog.meta.title}
                    </h3>
                  </a>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        {blog.meta.description}
                  </p>

                  <a
                    href={`/blogs/${blog.slug}`}
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                  >
                    Leer Blog

                    <span
                      aria-hidden="true"
                      className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                    >
                      &rarr;
                    </span>
                  </a>
                </article>

                // <Link key={index} href={`/blogs/${blog.slug}`}>
                //     <article>
                //          <h3>{blog.meta.title}</h3>
                //         <p>{blog.meta.description}</p>
                //     </article>
                // </Link>
            ))}
        </ul>

    )


}


