import { envs } from './config'
import { MongoDatabase } from './data/mongodb/mongo_database'
import { Server } from './presentation/server'
;(() => {
  main()
})()

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.DB_NAME
  })
  new Server({ port: envs.PORT }).start()
}
