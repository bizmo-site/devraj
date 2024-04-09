import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";

export default async function getChatResponse() {
  const model = new ChatOllama({
    baseUrl: "http://localhost:11434", // Default value
    model: "mistral", // Default value
  });
  
  const stream = await model
    .pipe(new StringOutputParser())
    .stream(`Translate "I love your programming" into German.`);
  
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  

  return chunks.join("");
}





