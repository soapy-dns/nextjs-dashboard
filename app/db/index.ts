import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

config({ path: ".env" })

console.log("database url", process.env.DATABASE_URL)

// prepare: false was for connecting to a connection pool
const client = postgres(process.env.DATABASE_URL!, { prepare: false })
export const db = drizzle(client, { logger: true })
