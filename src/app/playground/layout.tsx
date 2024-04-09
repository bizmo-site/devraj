'use client'
import { SandpackProvider } from "@codesandbox/sandpack-react"
 
export default function Layout({ children } : {children: React.ReactNode}) {
  return (
    <>


<SandpackProvider>
<main>{children}</main>
</SandpackProvider>

    


    </>
  )
}