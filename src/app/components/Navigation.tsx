'use client'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import { Button } from '@/components/ui/button';
  import { Circle } from 'lucide-react';
  import { Settings2 } from 'lucide-react';
  import { Bot } from 'lucide-react';
  import { LifeBuoy } from 'lucide-react';
  import { Book } from 'lucide-react';
import Models  from './Models';
import ThemeToggle  from './ThemeToggle';
import dynamic from 'next/dynamic';
  
 function Navigation() {
  return (
 <>
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
    <div className="border-b p-2">
      <Button variant="outline" size="icon" aria-label="Home">
        <Circle className="size-5 fill-foreground " />
      </Button>
    </div>
    <nav className="grid gap-1 p-2">
     <Models/>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg text-foreground bg-background"
            aria-label="Documentation"
          >
            <Book className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          Documentation
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg text-foreground bg-background"
            aria-label="Settings"
          >
            <Settings2 className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          Settings
        </TooltipContent>
      </Tooltip>
    </nav>
    <nav className="mt-auto grid gap-1 p-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="mt-auto rounded-lg text-foreground bg-background"
            aria-label="Help"
          >
            <LifeBuoy className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          Help
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
  <ThemeToggle/>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          Account
        </TooltipContent>
      </Tooltip>
    </nav>
  </aside>
  </>
  )
}


export default dynamic (()=> Promise.resolve(Navigation), {ssr: false})