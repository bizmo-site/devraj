'use client'
import { Button } from "@/components/ui/button";
import { useSandpack } from "@codesandbox/sandpack-react";
import { RefreshCw } from "lucide-react";
import { useEffect } from "react";
 
import React from 'react'

export default function Refresh() {
    const { dispatch, listen } = useSandpack();
 
    const handleRefresh = () => {
      // sends the refresh message to the bundler, should be logged by the listener
      dispatch({ type: "refresh" });
    };
   
    useEffect(() => {
      // listens for any message dispatched between sandpack and the bundler
      const stopListening = listen((msg) => console.log(msg));
   
      return () => {
        // unsubscribe
        stopListening();
      };
    }, [listen]);
   
    return (
     <Button variant={"default"} type="button" onClick={handleRefresh}>
        <RefreshCw/>
      </Button>
    );
  };
  


 