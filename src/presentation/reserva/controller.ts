import { NextFunction, Request, Response } from 'express'
import {
  ClienteRepository,
  ObtenerReservaPorIdDto,
  ReservaRepository,
  RestauranteRepository,
  SolicitarReservaDto
} from '../../domain'
import { RegistrarReserva } from '../../domain/use-case/reserva/registrar-reserva.usecase'
import { ObtenerReservaPorId } from '../../domain/use-case/reserva/obtener-reserva-por-id.usecase'

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

  obtenerReservaPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { usuario_rol_id, rol } = req.body.usuarioToken

      const reserva_id = req.params?.id

      const obtenerReservaPorIdDto = ObtenerReservaPorIdDto.crear({
        reserva_id,
        usuario_rol_id,
        rol_usuario: rol
      })

      const reserva = await new ObtenerReservaPorId(this.reservaRepository).execute(
        obtenerReservaPorIdDto
      )
      res.json(reserva)
    } catch (error) {
      next(error)
    }
  }
}
