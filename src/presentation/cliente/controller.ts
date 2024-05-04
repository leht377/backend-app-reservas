import { NextFunction, Request, Response } from 'express'
import {
  CancelarReserva,
  CancelarReservaDto,
  ClienteRepository,
  CustomErrors,
  ObtenerClientePorId,
  ReservaRepository
} from '../../domain'
import { UsuarioRol } from '../../common/utils'

export class ClienteController {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly reservaRepository: ReservaRepository
  ) {}
  obtenerClientePorId = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id
    try {
      const cliente = await new ObtenerClientePorId(this.clienteRepository).execute(id)
      res.json(cliente)
    } catch (error) {
      next(error)
    }
  }

  cancelarReserva = async (req: Request, res: Response, next: NextFunction) => {
    const usuario = req.body.usuarioToken
    const usuario_token_id = usuario?._id || usuario?.id
    const cliente_id = req.params?.id_cliente
    const reserva_id = req.params?.id_reserva
    const rol_usuario = usuario?.rol
    const usuario_rol_id = usuario?.usuario_rol_id

    try {
      const cancelarReservaDto = CancelarReservaDto.crear({
        usuario_token_id,
        cliente_id,
        reserva_id,
        rol_usuario,
        usuario_rol_id
      })

      const reserva = await new CancelarReserva(
        this.clienteRepository,
        this.reservaRepository
      ).execute(cancelarReservaDto)

      res.json(reserva)
    } catch (error) {
      next(error)
    }
  }
}
