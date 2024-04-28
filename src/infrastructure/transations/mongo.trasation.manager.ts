import { TransationManager } from '../../domain/transations'
import mongoose, { ClientSession } from 'mongoose'

export class MongoTransationManagerImpl implements TransationManager {
  async startSession(): Promise<ClientSession> {
    const session = await mongoose.startSession()
    session.startTransaction()
    return session
  }
  async commit(session: ClientSession): Promise<void> {
    await session.commitTransaction()
    session.endSession()
  }
  async abort(session: ClientSession): Promise<void> {
    await session.abortTransaction()
    session.endSession()
  }
}
