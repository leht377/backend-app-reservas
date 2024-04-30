import { NextFunction, Request, Response } from 'express'
import { RegistrarClienteUsuarioDto, RegistrarRestauranteUsuarioDto } from '../../domain/dtos'

import {
  ClienteRepository,
  RestauranteRepository,
  UsuarioRepository
} from '../../domain/repositories'
import { RegistrarClienteUsuario, RegistrarRestauranteUsuario } from '../../domain/use-case/auth'
import { TransationManager } from '../../domain/transations'

export class AuthController {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly clienteRepository: ClienteRepository,
    private readonly restauranteRepository: RestauranteRepository,
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
  registrarRestaurante = async (req: Request, res: Response, next: NextFunction) => {
    const session = await this.transationManager.startSession()
    try {
      const registrarRestauranteUsuarioDto = RegistrarRestauranteUsuarioDto.crear(req.body)
      const token = await new RegistrarRestauranteUsuario(
        this.usuarioRepository,
        this.restauranteRepository
      ).execute(registrarRestauranteUsuarioDto, session)
      await this.transationManager.commit(session)
      res.json(token)
    } catch (error) {
      await this.transationManager.abort(session)
      next(error)
    }
  }
  login = (req: Request, res: Response, next: NextFunction) => {}
}
