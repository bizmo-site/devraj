'use client'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


export default function page() {
  return (
    <div>
      <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
        Link
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

      
    </div>
  )
}
