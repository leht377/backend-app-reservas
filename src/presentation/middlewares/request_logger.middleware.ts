import { Request, Response } from 'express'
import morgan from 'morgan'

export class RequesLoggerMiddleware {
  static LogerRequest() {
    return morgan(function (tokens, req: Request, res: Response) {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms'
      ].join(' ')
    })
  }
}
