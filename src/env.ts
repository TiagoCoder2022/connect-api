import { z } from "zod"
import "dotenv/config"; 

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  CORS_ORIGIN: z.string().url().optional(),
})

export const env = envSchema.parse(process.env)