import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  DB_NAME: get('DB_NAME').required().asString(),
  SEED_TOKEN_SECRET: get('SEED_TOKEN_SECRET').required().asString(),

  AWS_BUCKET_NAME: get('AWS_BUCKET_NAME').required().asString(),
  AWS_BUCKET_REGION: get('AWS_BUCKET_REGION').required().asString(),
  AWS_PUBLIC_KEY: get('AWS_PUBLIC_KEY').required().asString(),
  AWS_SECRET_KEY: get('AWS_SECRET_KEY').required().asString()
}
