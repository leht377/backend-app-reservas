import { NextFunction, Request, Response } from 'express'
import { CustomErrors } from '../../domain'

export class ErrorHandlerMiddleware {
  static ErrorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
    console.log(error)
    if (error instanceof CustomErrors) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log(error)
    return res.status(500).json({ error: 'Internal server Error' })
  }
}
