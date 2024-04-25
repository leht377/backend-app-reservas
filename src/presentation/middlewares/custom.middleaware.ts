import { Request, Response } from 'express'

export class CustomMiddleware {
  static UnknowEnpoint(req: Request, res: Response) {
    res.status(400).send({ error: 'unknown endpoint' })
  }
}
