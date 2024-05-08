import { NextFunction, Request, Response } from 'express'
import {
  LoginUsuarioDto,
  RefreshTokenDto,
  RegistrarClienteUsuarioDto,
  RegistrarRestauranteUsuarioDto
} from '../../domain/dtos'

import {
  ClienteRepository,
  RestauranteRepository,
  UsuarioRepository
} from '../../domain/repositories'
import {
  LoginUsuario,
  RefreshToken,
  RegistrarClienteUsuario,
  RegistrarRestauranteUsuario
} from '../../domain/use-case/auth'
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
      const userToken = await new RegistrarClienteUsuario(
        this.usuarioRepository,
        this.clienteRepository
      ).execute(registrarClienteDto, session)

      await this.transationManager.commit(session)
      const { refreshToken, token, usuario } = userToken
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      res.json({ token, usuario })
    } catch (error) {
      await this.transationManager.abort(session)
      next(error)
    }
  }
  registrarRestaurante = async (req: Request, res: Response, next: NextFunction) => {
    const session = await this.transationManager.startSession()
    try {
      const registrarRestauranteUsuarioDto = RegistrarRestauranteUsuarioDto.crear(req.body)
      const userToken = await new RegistrarRestauranteUsuario(
        this.usuarioRepository,
        this.restauranteRepository
      ).execute(registrarRestauranteUsuarioDto, session)
      await this.transationManager.commit(session)
      const { refreshToken, token, usuario } = userToken
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      res.json({ token, usuario })
    } catch (error) {
      await this.transationManager.abort(session)
      next(error)
    }
  }
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginUsuarioDto = LoginUsuarioDto.crear(req.body)
      const userToken = await new LoginUsuario(
        this.usuarioRepository,
        this.restauranteRepository,
        this.clienteRepository
      ).execute(loginUsuarioDto)

      const { refreshToken, token, usuario } = userToken
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      res.json({ token, usuario })
    } catch (error) {
      next(error)
    }
  }

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshTokenReq = req.cookies?.jwt

      const refreshTokenDto = RefreshTokenDto.crear({ refresh_token: refreshTokenReq })
      const userToken = await new RefreshToken().execute(refreshTokenDto)
      const { refreshToken, token, usuario } = userToken
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      res.json({ token, usuario })
    } catch (error) {
      next(error)
    }
  }
}
