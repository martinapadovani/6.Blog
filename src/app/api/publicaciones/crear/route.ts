import { PrismaClient} from "@prisma/client"
//Importamos PrismaClient desde la libreria @prisma/client

const prisma = new PrismaClient 


export async function POST(req: Request) {

    const nuevaPublicacion = await req.json()

    const subirPublicacion = await prisma.publicacion.create({data: nuevaPublicacion})

    return new Response(JSON.stringify(subirPublicacion))
}