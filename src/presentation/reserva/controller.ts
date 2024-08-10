import { NextFunction, Request, Response } from 'express'
import {
  AceptarReservaDto,
  CancelarReservaDto,
  ClienteRepository,
  ObtenerReservaPorIdDto,
  RechazarReservaDto,
  ReservaRepository,
  RestauranteRepository,
  SolicitarReservaDto
} from '../../domain'
import { RegistrarReserva } from '../../domain/use-case/reserva/registrar-reserva.usecase'
import { ObtenerReservaPorId } from '../../domain/use-case/reserva/obtener-reserva-por-id.usecase'
import { EmailRepository } from '../../domain/repositories/email.repository'
import { AceptarReserva, CancelarReserva, RechazarReserva } from '../../domain/use-case/reserva'

export class ReservaController {
  constructor(
    private readonly reservaRepository: ReservaRepository,
    private readonly restauranteRepository: RestauranteRepository,
    private readonly clienteRepository: ClienteRepository,
    private readonly emailRepository: EmailRepository
  ) {}

  registrarReserva = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario = req.body.usuarioToken
      const usuario_id_token = usuario?._id || usuario.id

      const solicitarReservaDto = SolicitarReservaDto.crear({ ...req.body, usuario_id_token })
      const reserva = await new RegistrarReserva(
        this.reservaRepository,
        this.restauranteRepository,
        this.clienteRepository,
        this.emailRepository
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

  aceptarReserva = async (req: Request, res: Response, next: NextFunction) => {
    const usuario = req.body.usuarioToken
    const usuario_token_id = usuario?._id || usuario?.id
    const reserva_id = req.params?.id
    const rol_usuario = usuario?.rol
    const usuario_rol_id = usuario?.usuario_rol_id
    const body = req.body
    try {
      const aceptarReservaDto = AceptarReservaDto.crear({
        usuario_token_id,
        reserva_id,
        rol_usuario,
        usuario_rol_id,
        ...body
      })

      const reserva = await new AceptarReserva(
        this.reservaRepository,
        this.restauranteRepository,
        this.clienteRepository,
        this.emailRepository
      ).execute(aceptarReservaDto)

      res.json(reserva)
    } catch (error) {
      next(error)
    }
  }

  rechazarReserva = async (req: Request, res: Response, next: NextFunction) => {
    const usuario = req.body.usuarioToken
    const usuario_token_id = usuario?._id || usuario?.id
    const reserva_id = req.params?.id
    const rol_usuario = usuario?.rol
    const usuario_rol_id = usuario?.usuario_rol_id
    const body = req.body
    try {
      const rechazarReservaDto = RechazarReservaDto.crear({
        usuario_token_id,
        reserva_id,
        rol_usuario,
        usuario_rol_id,
        ...body
      })

      const reserva = await new RechazarReserva(
        this.reservaRepository,
        this.restauranteRepository,
        this.clienteRepository,
        this.emailRepository
      ).execute(rechazarReservaDto)

      res.json(reserva)
    } catch (error) {
      next(error)
    }
  }

  cancelarReserva = async (req: Request, res: Response, next: NextFunction) => {
    const usuario = req.body.usuarioToken
    const usuario_token_id = usuario?._id || usuario?.id
    const cliente_id = req.params?.id_cliente
    const reserva_id = req.params?.id
    const rol_usuario = usuario?.rol
    const usuario_rol_id = usuario?.usuario_rol_id
    const body = req.body
    try {
      const cancelarReservaDto = CancelarReservaDto.crear({
        usuario_token_id,
        cliente_id,
        reserva_id,
        rol_usuario,
        usuario_rol_id,
        ...body
      })

      const reserva = await new CancelarReserva(
        this.reservaRepository,
        this.restauranteRepository,
        this.clienteRepository,
        this.emailRepository
      ).execute(cancelarReservaDto)

      res.json(reserva)
    } catch (error) {
      next(error)
    }
  }
}
