import mongoose from 'mongoose'
import { logger } from '../../common/utils'

interface OptionsDB {
  mongoUrl: string
  dbName: string
}
export class MongoDatabase {
  static async connect(options: OptionsDB) {
    const { mongoUrl, dbName } = options
    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName
      })
      logger.log('Mongo connected')
    } catch (error) {
      logger.log(`Error conection DB ${error}`)
    }
  }
}
