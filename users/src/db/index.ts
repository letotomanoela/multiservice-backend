import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as relation from "./relation";
import * as schema from "./schemas";

const db = drizzle(process.env.DATABASE_URL!, {
  schema: { ...schema, ...relation },
});
export default db;
