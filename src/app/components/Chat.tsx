import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CornerDownLeft, Send, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
export default function Chat() {
  return (
    <div>
      <form className="flex gap-2" >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Input
          id="message"
          placeholder="Type your message here..."
        />
    <Button type="submit" size='icon'>
      <SendHorizonal className="h-4 w-4"/>
          </Button>
      </form>
    </div>
  );
}
