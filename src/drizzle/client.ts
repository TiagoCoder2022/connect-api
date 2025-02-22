import { drizzle } from "drizzle-orm/postgres-js"
import postres from "postgres"
import { env } from "../env"
import { subscriptions } from "./schema/subscriptions"


export const pg = postres(env.POSTGRES_URL)
export const db = drizzle(pg, {
    schema: {
        subscriptions,
    }
})

