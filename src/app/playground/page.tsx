"use client";
import {
  Bird,
  Book,
  Bot,
  Circle,
  Code2,
  CornerDownLeft,
  File,
  Folder,
  FolderArchive,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SandpackProvider,
  SandpackConsole,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackStack,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Chat from "../components/Chat";

export default function playground() {
  const files = {}
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Circle className="size-5 fill-foreground " />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Models"
              >
                <Bot className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Models
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
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
                className="rounded-lg"
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
                className="mt-auto rounded-lg"
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
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
              >
                <SquareUser className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Account
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col">
        <SandpackProvider customSetup={{ 
        dependencies: { 
          "immer": "10.0.4" 
        }
      }}
      
      theme={"light"} template='vite-react' files={files} >
          <SandpackStack>
        <SandpackLayout   style={{background: "white"}}>
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 ">
            <div
              className="relative hidden flex-col items-start gap-8 md:flex"
              x-chunk="dashboard-03-chunk-0"
            >
              <div className="grid w-full items-start gap-2">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Chat
                  </legend>

                  <div className="grid gap-3">
                    <Label htmlFor="content">AI Response</Label>
                    <Textarea id="content" className="min-h-[9.5rem]" />
                    <Chat />
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Output
                  </legend>
                  <SandpackPreview 
                    style={{ height: "45vh" }}
                    showNavigator={true}
                    showOpenNewtab={true}
                    showOpenInCodeSandbox={false}
                    showRestartButton={true}
                    showRefreshButton={true}
                  />
                </fieldset>
              </div>
            </div>
            <div className="relative flex h-screen flex-col col-span-1">
         
              <fieldset className="grid gap-6 h-[92vh] rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Code Editor
                </legend>
                <Tabs defaultValue="editor">
                  <TabsList className="grid w-[200px] grid-cols-3">
                    <TabsTrigger value="file-tree">
                      <Folder className="h-5 w-5" />
                    </TabsTrigger>
                    <TabsTrigger value="editor">
                      <Code2 className="h-5 w-5" />
                    </TabsTrigger>
                    <TabsTrigger value="console">
                      <SquareTerminal className="h-5 w-5" />
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent className="w-full" value="editor">
                    <SandpackCodeEditor
                      style={{ height: "80vh" }}
                      showTabs={true}
                      showLineNumbers={false}
                      showInlineErrors={true}
                      wrapContent
                      closableTabs
                    />
                  </TabsContent>
                  <TabsContent value="file-tree">
                    <SandpackFileExplorer style={{ height: "80vh" }} />
                  </TabsContent>
                  <TabsContent value="console">
                    <SandpackConsole    style={{ height: "80vh" }} />
                  </TabsContent>
                </Tabs>
              </fieldset>
            </div>
          </main>
          </SandpackLayout>
          </SandpackStack>
        </SandpackProvider>
      </div>
    </div>
  );
}
