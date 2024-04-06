'use client'
import { SandpackProvider } from "@codesandbox/sandpack-react"
 
export default function Layout({ children } : {children: React.ReactNode}) {
  return (
    <>



<main>{children}</main>
    


    </>
  )
}