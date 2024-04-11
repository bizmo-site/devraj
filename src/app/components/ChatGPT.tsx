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
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",

          content: `You are Devraj, a fully automated coding AI engineer. 
          User will ask you to build an application and you are only supposed to respond in the given JSON format 
          files={{
               "/App.jsx": "export default function App() {\n  return <h1>Hello World</h1>\n}"
             }}
   
   App.jsx is always the entry file, If there are multiple files seperate with a comma after each object s, like specified in the format both key and value should be string without backtics, first respond with steps involved and then start writing the code as specified in the given format and please do not forget to seperate each key value pair with a "," if you dont follow this you are fired`,
        },

        { role: "user", content: inputValue },
      ],
    });

    const systemMessage = completion.choices[0].message;
    if (systemMessage && systemMessage.content) {
      setMessages((prevMessages) => [...prevMessages, systemMessage]);
      const responseArray = systemMessage.content.split("\n");
      const response = responseArray.join("");
      console.log("res", response);
      if (response) {
        try {
          const responseObject = JSON.parse(response);
          const filesObject = responseObject.files;
          console.log("fileobj", JSON.stringify(filesObject));
          localStorage.setItem("file", JSON.stringify(filesObject));
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
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
            {message.role === "user" ? (
              <p className="text-foreground"> {message.content} </p>
            ) : (
              <p className="text-foreground">
                {message.content &&
                  JSON.parse(message.content).steps}
              </p>
            )}
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
