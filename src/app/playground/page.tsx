"use client";
import { Code2, Folder, SquareTerminal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SandpackProvider,
  SandpackConsole,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackStack,
  SandpackCodeEditor
} from "@codesandbox/sandpack-react";
import Navigation from "../components/Navigation";
import Gemini from "../components/Gemini";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";


export default function Playground() {
  const { theme } = useTheme();

  const [localStorageData, setLocalStorageData] = useState<any>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("file");
      setLocalStorageData(storedData ? storedData : {});
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined") {
        const generatedFiles = localStorage.getItem("files");
        if (generatedFiles !== localStorageData) {
          setLocalStorageData(generatedFiles ? JSON.parse(generatedFiles) : {});
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [localStorageData]);

  // Rest of your component code...
  console.log("local", localStorageData);

  const sandpacktheme = theme === "light" ? "light" : "dark";

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Navigation />
      <div className="flex flex-col">
        <SandpackProvider
          options={{ recompileMode: "immediate" }}
          theme={sandpacktheme}
          template="vite-react"
          files={{}}
        >
          <SandpackStack>
            <SandpackLayout
              style={{ background: theme === "light" ? "white" : "black" }}
            >
              <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 ">
                <div
                  className="relative  flex-col items-start gap-8 md:flex"
                  x-chunk="dashboard-03-chunk-0"
                >
                  <div className="grid w-full items-start gap-2">
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium text-foreground">
                        Devraj AI
                      </legend>

                      <div className="grid gap-3">
                        <Gemini />
                      </div>
                    </fieldset>
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium text-foreground">
                        Output
                      </legend>
                      <SandpackPreview
                        style={{ height: "45vh" }}
                        showNavigator={true}
                        showOpenNewtab={true}
                        showOpenInCodeSandbox={false}
                        showRestartButton={true}
                        showRefreshButton={true} />
                    </fieldset>
                  </div>
                </div>
                <div className="relative flex h-screen flex-col col-span-1">
                  <fieldset className="grid gap-6 h-[92vh] rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium text-foreground">
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
                          style={{
                            height: "80vh",
                            background: theme === "light" ? "white" : "black",
                          }}
                          showRunButton={true}
                          showTabs={true}
                          showLineNumbers={false}
                          showInlineErrors={true}
                          wrapContent
                          closableTabs />
                      </TabsContent>
                      <TabsContent value="file-tree">
                        <SandpackFileExplorer style={{ height: "80vh" }} />
                      </TabsContent>
                      <TabsContent value="console">
                        <SandpackConsole style={{ height: "80vh" }} />
                      </TabsContent>
                    </Tabs>
                  </fieldset>
                </div>
              </main>
            </SandpackLayout>
          </SandpackStack>
        </SandpackProvider>
      </div>s
    </div>
  );
}
