import Image from 'next/image'
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from 'next/link'

export default function Home() {

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/auth/registrarse" > Ir a registrarse</Link>
      
      <h2>Blog de Roberto</h2>

      {//Itero todos los blogs para mostrarlos con un formato html indicado
        blogs.map((blog, index) =>(
          <Link key={index} href={`/blogs/${blog.slug}`}>
            <article>
              <h3>{blog.meta.title}</h3>
              <p>{blog.meta.description}</p>
            </article>
          </Link>
        ))
      }
  
    </main>
  )
}
