import { EmailProvider } from "@/context/EmaiContext";

export default function Layout ({children} : { children: React.ReactNode}) {

    return (
        <section>
            <h1 className="mt-10 text-center text-6xl font-bold leading-9 tracking-tight text-white">Blog de Roberto</h1>
            <EmailProvider>
                {children}
            </EmailProvider>
            
        </section>
    )

}

