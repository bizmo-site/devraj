"use client"

import * as React from "react"
import dynamic from "next/dynamic"

import { Progress } from "@/components/ui/progress"

function LoadingScreen() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <div className="flex justify-center items-center h-screen">
    <Progress value={progress} className="max-w-md " />
  </div>
}

export default dynamic (()=> Promise.resolve(LoadingScreen), {ssr: false})