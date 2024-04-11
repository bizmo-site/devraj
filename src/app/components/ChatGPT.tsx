import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = { role: "user", content: inputValue };
    setMessages([...messages, newMessage]);
    setInputValue("");

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are Devraj, a fully automated coding AI engineer.
        
        Instructions:
        
        If there are multiple files seperate with a comma after each object 
        App.jsx is always the entry file, multiple files can be seperated with a comma, 
        User will ask you to build an application and respond only in the given format and please wait for the users input
        This is an example format in which i need you to generate filename and code in key value pairs like specified in the below format both should be string without backtics
        first start with steps involved and then start writing the code as specified in below format
        files={{
            "/App.jsx": "export default function App() {\n  return <h1>Hello World</h1>\n}",
            "/Button.jsx": "export default () => {\n  return <button>Hello</button>\n}"
          }}
        first give a very short introduction about yourself and wait for user input `,
        },
        { role: "user", content: inputValue },
      ],
    });

    const systemMessage = completion.choices[0].message;
    if (systemMessage && systemMessage.content) {
      setMessages((prevMessages) => [...prevMessages, systemMessage]);

      const responseArray = systemMessage.content.split("\n");
      const response = responseArray.join("");
      console.log("resarray", responseArray)
      if (response && response.includes("files={")) {
        const filesStartIndex = response.indexOf("files={") + 7;
        const filesEndIndex = response.lastIndexOf("}");
        const filesObject = response.substring(filesStartIndex, filesEndIndex);
        localStorage.setItem("file", filesObject);
        console.log( "fileobj", filesObject)    
      }
    }

    
    

  };


  console.log(messages);

  return (
    <div>
      <div className="h-44 rounded-md mb-4 border border-1 p-2 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 border border-1 my-2 rounded-md ${
              message.role === "user" ? "ml-10" : "mr-10"
            }`}
          >
            <p className="text-foreground"> {message.content} </p>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <Input
          id="message"
          placeholder="Type your message here..."
          className="text-foreground"
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

export default Chat;
