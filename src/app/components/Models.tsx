
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import { Bot } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Models() {
  return (
    <Dialog>
      
      <Tooltip>
        <TooltipTrigger asChild>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg text-foreground bg-background"
            aria-label="Models"
          >
            <Bot className="size-5" />
          </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          Models
        </TooltipContent>
      </Tooltip>
  
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select AI Model</DialogTitle>
          <DialogDescription>
            Select Appropriate Model
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
 
        </div>
        <DialogFooter>
          <Button type="submit">Save </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
