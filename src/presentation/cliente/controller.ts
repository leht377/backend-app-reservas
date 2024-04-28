import { NextFunction, Request, Response } from 'express'
import { ClienteRepository, ObtenerClientePorId } from '../../domain'

export class ClienteController {
  constructor(private readonly clienteRepository: ClienteRepository) {}
  obtenerClientePorId = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id
    try {
      const cliente = await new ObtenerClientePorId(this.clienteRepository).execute(id)
      res.json(cliente)
    } catch (error) {
      next(error)
    }
  }
}
