import express from 'express'
import { logger } from '../common/utils'

interface Options {
  port?: number
}

export class Server {
  public readonly app = express()
  private readonly port: number

  constructor(options: Options) {
    const { port = 3001 } = options
    this.port = port
  }

  async start() {
    this.app.use(express.json())
    this.app.listen(this.port, () => {
      logger.log(`Server is running on port ${this.port}`)
    })
  }
}
