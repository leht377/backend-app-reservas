import { NextFunction, Request, Response } from 'express'
import { RegistrarClienteUsuarioDto } from '../../domain/dtos'

import { ClienteRepository, UsuarioRepository } from '../../domain/repositories'
import { RegistrarClienteUsuario } from '../../domain/use-case/auth'

export class AuthController {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly clienteRepository: ClienteRepository
  ) {}

  registrarCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registrarClienteDto = RegistrarClienteUsuarioDto.crear(req.body)

      const token = await new RegistrarClienteUsuario(
        this.usuarioRepository,
        this.clienteRepository
      ).execute(registrarClienteDto)

      res.json(token)
    } catch (error) {
      next(error)
    }
  }
  registrarRestaurante = (req: Request, res: Response, next: NextFunction) => {}
  login = (req: Request, res: Response, next: NextFunction) => {}
}
