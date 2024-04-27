import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  DB_NAME: get('DB_NAME').required().asString(),
  SEED_TOKEN_SECRET: get('SEED_TOKEN_SECRET').required().asString()
}
