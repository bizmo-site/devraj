import Dexie from "dexie";

// Define the interface for API key entry
export interface APIKey {
  model: string;
  apiKey: string;
}

// Define the Dexie database schema
class MyDatabase extends Dexie {
  keys: Dexie.Table<APIKey, string>;

  constructor() {
    super("APIKeys");
    this.version(1).stores({
      keys: "model, apiKey",
    });
    this.keys = this.table("keys");
  }
}


const db = new MyDatabase();

export default db;
