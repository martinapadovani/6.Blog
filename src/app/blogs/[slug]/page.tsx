import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"

//Generar estaticamente los blogs
export async function generateStaticParams(){

    //Obtengo los archivos dentro de /blogs
    const archivos = fs.readdirSync(path.join("src/blogs"))

    //Creo la ruta de cada archivo
    const rutas = archivos.map((nombreDeArchivo) => ({

        slug: nombreDeArchivo.replace(".mdx", "")
        //por cada archivo, devuelvo su slug ,que es igual al nombre del archivo sin el .mdx
    }))

    return rutas
}

//Funcion que lea los blogs 
function obtenerBlog ({slug}: {slug: string}){
    //recibe por parametro el slug para buscar el blog correspondiente

    //Referenciamos el archivo del blog
    const archivoDeBlog = fs.readFileSync(path.join("src/blogs/" + slug + ".mdx"), "utf-8")
    //Busco el archivo del blog, dentro de "blogs" que tenga como nombre el slug.mdx

    //Leemos el archivo referenciado y obtenemos sus metadatos y contenido
    const {data: frontMatter, content } = matter(archivoDeBlog)

    return { //la funcion devuelve un objeto (el blog) con:

        frontMatter, //Los metadatos
        slug,
        content
    }
}

//Creo una pagina que recibe el slug por parametro, para crear una pagina por cada blog referenciado
export default function Page({params} : {params: {slug: string}}) {

    //Ejecutamos obtenerBlog pasandole por parametro el slug obtenido desde la ruta de la pagina
    const blog = obtenerBlog(params)    

    return(
        <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto">
            <h1>{blog.frontMatter.title}</h1>
            
            {/*@ts-ignore*/}
            <MDXRemote source={blog.content}></MDXRemote>
            {/* MDXRemote renderiza el contenido MDX directamente en la app*/}
        </article>
    )
}



