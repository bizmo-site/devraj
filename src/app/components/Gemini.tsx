"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import dynamic from "next/dynamic";

const genAI = new GoogleGenerativeAI("AIzaSyCJqVGgs4zIozXC7O7xSeglvUKuWGdbShc");
const MODEL_NAME = "gemini-1.0-pro";

interface Message {
  role: string;
  content: string;
}

const chat = genAI.getGenerativeModel({ model: MODEL_NAME }).startChat({
  generationConfig: {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  history: [],
});

const Chat: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const loadInitialMessage = async () => {
      const initialMessage = `
        You are Devraj, a fully automated coding AI engineer.
        
        Instructions:
        
        If there are multiple files seperate with a comma after each object 
        App.jsx is always the entry file
        User will ask you to build an application and respond only in the given format and please wait for the users input
        This is an example format in which i need you to generate filename and code in key value pairs like specified in the below format both should be string without backtics
        files={
          {
            "/App.jsx": "export default function App() {\n  return <h1>Hello World</h1>\n}",
            "/Button.jsx": "export default () => {\n  return <button>Hello</button>\n}"
          }

        }
  

        first give a very short introduction about yourself and wait for user input `;

      const result = await chat.sendMessage(initialMessage);
      const initialMessages = [
        { role: "model", content: result.response.text() },
      ];
      setMessages(initialMessages);
    };

    loadInitialMessage();
  }, []);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    const result = await chat.sendMessage(inputValue);
    const response = result.response;
    setMessages([
      ...messages,
      { role: "user", content: inputValue },
      { role: "model", content: response.text() },
    ]);
    setInputValue("");

    if (response.text().includes("files={")) {
      const filesStartIndex = response.text().indexOf("files={") + 7;
      const filesEndIndex = response.text().lastIndexOf("}");
      const filesObject = response
        .text()
        .substring(filesStartIndex, filesEndIndex);

      localStorage.setItem("file", filesObject);
    }
  };

  const parseHTML = (htmlString: string) => {
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(htmlString, "text/html");
    return parsedDocument.body.innerHTML;
  };

  return (
    <div>
      <div className="h-44 rounded-md mb-4 border border-1 p-2 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 border text-foreground border-1 my-2 rounded-md ${
              message.role === "user" ? "ml-10" : "mr-10"
            }`}
          >
            <p>
              {message.content ? parseHTML(message.content) : message.content}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <Input
          id="message"
          className="text-foreground"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" size="icon">
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Chat), { ssr: false });
