import mongoose from 'mongoose'

export class TransactionManagerAdapter {
  async startTransaction(): Promise<mongoose.ClientSession> {
    const session = await mongoose.startSession()
    session.startTransaction()
    return session
  }

  async commitTransaction(session: mongoose.ClientSession): Promise<void> {
    await session.commitTransaction()
    session.endSession()
  }

  async abortTransaction(session: mongoose.ClientSession): Promise<void> {
    await session.abortTransaction()
    session.endSession()
  }

  static async withTransaction<T>(
    fn: (session: mongoose.ClientSession) => Promise<T>
  ): Promise<void> {
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      await fn(session)
    })
  }
}
