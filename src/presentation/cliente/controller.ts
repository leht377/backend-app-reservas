import { NextFunction, Request, Response } from 'express'
import { ClienteRepository, UsuarioRepository } from '../../domain/repositories'
import { CrearClienteUsuarioDto } from '../../domain/dtos'

import { CrearCliente } from '../../domain/use-case'
import { CustomErrors } from '../../domain'

import mongoose from 'mongoose'

export class ClienteController {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly usuarioRepository: UsuarioRepository
  ) {}

  crearCliente = async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const [error, crearClienteUsuarioDto] = CrearClienteUsuarioDto.crear(req.body)
      if (error) throw CustomErrors.badRequest(error)

      const cliente = await new CrearCliente(
        this.clienteRepository,
        this.usuarioRepository
      ).execute(crearClienteUsuarioDto!, session)

      await session.commitTransaction()
      session.endSession()

      res.json(cliente)
    } catch (error) {
      await session.abortTransaction()
      session.endSession()
      next(error)
    }
  }
}
