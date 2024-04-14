"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bot } from "lucide-react";
import dynamic from "next/dynamic";
import db, { APIKey } from "../db/db";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

function Models() {
  const [apiKey, setApiKey] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("chatgpt");
 

  useEffect(() => {
    db.keys
      .get(selectedModel)
      .then((result: APIKey | undefined) => {
        if (result) {
          setApiKey(result.apiKey);
        } else {
          setApiKey(""); // Clear the apiKey if no key is found
        }
      })
      .catch((error) => {
        console.error("Error retrieving API key:", error);
      });
  }, [selectedModel]);

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = event.target.value;
    setApiKey(newApiKey);
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = event.target.value;
    console.log(selectedModel)
    setSelectedModel(selectedModel);
  };

  const handleSubmit = () => {
    db.keys
      .put({ model: selectedModel, apiKey: apiKey })
      .then(() => {
        console.log("API key saved successfully");
      })
      .catch((error) => {
        console.error("Error saving API key:", error);
      });
  };

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
          <DialogDescription>Select Appropriate Model</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select defaultValue={selectedModel} >
            <SelectTrigger
              id="model"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue  onChange={handleModelChange}
                placeholder="Select a model"
              
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chatgpt">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <div className="grid gap-0.5">
                    <p className="font-medium text-foreground">ChatGPT 3.5</p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="apikey">API Key</Label>
          <Input
            id="apikey"
            type="text"
            placeholder="Enter API Key"
            value={apiKey}
            onChange={handleApiKeyChange}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default dynamic(() => Promise.resolve(Models), { ssr: false });
