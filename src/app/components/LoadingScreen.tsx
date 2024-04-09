"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export default function LoadingScreen() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <div className="flex justify-center items-center h-screen">
    <Progress value={progress} className="max-w-md " />
  </div>
}
