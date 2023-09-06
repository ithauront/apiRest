import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({
    path: '.env.test',
  })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z
    .string()
    .nonempty()
    .refine(
      (value) => {
        if (typeof value === 'string' && isNaN(Number(value))) {
          return true
        }
        return false
      },
      { message: 'DATABASE_URL must be a non-numeric string' },
    ),
  PORT: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('error: invalid environment variables:', _env.error.format())
  throw new Error('invalid environment variables')
}

export const env = _env.data
