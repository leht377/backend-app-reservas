import { NextFunction, Request, Response } from 'express'
import { MenuRepository } from '../../domain'

export class MenuController {
  constructor(private readonly menuRepository: MenuRepository) {}

  registrarMenu = (req: Request, res: Response, next: NextFunction) => {
    res.json('hola menu')
  }
}
