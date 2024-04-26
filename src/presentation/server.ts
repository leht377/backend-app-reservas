import express, { Router } from 'express'
import { logger } from '../common/utils'
import { RequesLoggerMiddleware } from './middlewares/request_logger.middleware'
import { ErrorHandlerMiddleware } from './middlewares/error_handler.middleware'

interface Options {
  port?: number
  router: Router
}

export class Server {
  public readonly app = express()
  private readonly port: number
  private readonly routes: Router

  constructor(options: Options) {
    const { port = 3001, router } = options
    this.port = port
    this.routes = router
  }

  async start() {
    this.app.use(express.json())
    this.app.use(RequesLoggerMiddleware.LogerRequest())
    this.app.use(this.routes)

    this.app.listen(this.port, () => {
      logger.log(`Server is running on port ${this.port}`)
    })
  }
}
