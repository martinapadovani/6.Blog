
import Link from 'next/link'
import ListaDeBlogs from '@/components/ListaDeBlogs'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/auth/registrarse" > Ir a registrarse</Link>  

      <ListaDeBlogs/>
    </main>
  )
}
