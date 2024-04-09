import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import OpenAI from "openai";

const openai = new OpenAI({apiKey: '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', dangerouslyAllowBrowser: true});

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const codeformat = `files={{
    "/App.jsx": \`export default function App() {
    return <h1>Hello World</h1>
  }\`,
    "/Button.jsx": \`export default () => {
    return <button>Hello</button>
  }\`
  }}`;

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = { role: "user", content: inputValue };
    setMessages([...messages, newMessage]);
    setInputValue("");


    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `You are a fully automated coding AI
        If there are multiple files seperate with a comma after each object 
        App.jsx is always the entry file
        User will ask you to build an application and respond only in the given format and please wait for the users input
        This is an example format in which i need you to generate code ${codeformat}`},

        { role: "user", content: inputValue },
      ],
      stream: true,
    });

    for await (const chunk of completion) {
      const systemMessage = chunk.choices[0].delta.content;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "system", content: systemMessage },
      ]);
    }
  };

  return (
    <div>
      <div className="h-42 rounded-md mb-4 border border-1 p-2 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 border border-1 my-2 rounded-md ${message.role === 'user' ? 'ml-10' : 'mr-10'}`}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <Input
          id="message"
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

export default Chat;
