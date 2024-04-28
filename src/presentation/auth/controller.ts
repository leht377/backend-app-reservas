import { NextFunction, Request, Response } from 'express'
import { RegistrarClienteUsuarioDto } from '../../domain/dtos'

import { ClienteRepository, UsuarioRepository } from '../../domain/repositories'
import { RegistrarClienteUsuario } from '../../domain/use-case/auth'
import { TransationManager } from '../../domain/transations'

export class AuthController {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly clienteRepository: ClienteRepository,
    private readonly transationManager: TransationManager
  ) {}

  registrarCliente = async (req: Request, res: Response, next: NextFunction) => {
    const session = await this.transationManager.startSession()
    try {
      const registrarClienteDto = RegistrarClienteUsuarioDto.crear(req.body)
      const token = await new RegistrarClienteUsuario(
        this.usuarioRepository,
        this.clienteRepository
      ).execute(registrarClienteDto, session)

      await this.transationManager.commit(session)
      res.json(token)
    } catch (error) {
      await this.transationManager.abort(session)
      next(error)
    }
  }
  registrarRestaurante = (req: Request, res: Response, next: NextFunction) => {}
  login = (req: Request, res: Response, next: NextFunction) => {}
}
