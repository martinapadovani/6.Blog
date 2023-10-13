import Image from 'next/image'
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from 'next/link'

export default function Home() {

  const direccionDeMisBlogs = "src/blogs"

  const archivos = fs.readdirSync(path.join(direccionDeMisBlogs))
  //Devuelve un arreglo de los nombre de los archivos dentro de ese directorio

  console.log(archivos)

  const blogs = archivos.map((nombreDelArchivo => {
    const contenidoDelArchivo = fs.readFileSync(path.join(direccionDeMisBlogs, nombreDelArchivo), "utf-8")

    const { data: frontMatter } = matter(contenidoDelArchivo)

    return {

      meta: frontMatter,
      slug: nombreDelArchivo.replace(".mdx", "")

    }
  }))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/auth/registrarse" > Ir a registrarse</Link>
      
      <h2>Blog de Roberto</h2>
      {/* 
      {
        blogs.map((blog, index => {
          

        }))
      } */}
  
    </main>
  )
}
