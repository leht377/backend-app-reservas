import { NextFunction, Request, Response } from 'express'
import {
  ClienteRepository,
  ReservaRepository,
  RestauranteRepository,
  SolicitarReservaDto
} from '../../domain'
import { RegistrarReserva } from '../../domain/use-case/reserva/registrar-reserva.usecase'

export class ReservaController {
  constructor(
    private readonly reservaRepository: ReservaRepository,
    private readonly restauranteRepository: RestauranteRepository,
    private readonly clienteRepository: ClienteRepository
  ) {}

  registrarReserva = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario = req.body.usuarioToken
      const usuario_id_token = usuario?._id || usuario.id

      const solicitarReservaDto = SolicitarReservaDto.crear({ ...req.body, usuario_id_token })
      const reserva = await new RegistrarReserva(
        this.reservaRepository,
        this.restauranteRepository,
        this.clienteRepository
      ).execute(solicitarReservaDto)
      res.json(reserva)
    } catch (error) {
      next(error)
    }
  }
}
