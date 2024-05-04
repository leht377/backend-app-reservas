import { EstadoReserva } from '../../../common/utils'
import { ActualizarReservaDto, ObtenerReservaPorIdDto, CancelarReservaDto } from '../../dtos'
import { ReservaEntity } from '../../entities'
import { CustomErrors } from '../../errors'
import { ClienteRepository, ReservaRepository, RestauranteRepository } from '../../repositories'
import { ObtenerReservaPorId } from '../reserva/obtener-reserva-por-id.usecase'
import { ObtenerClientePorId } from './obterner-cliente-id.usecase'

export class CancelarReserva {
  constructor(
    private readonly clienteRespository: ClienteRepository,
    private readonly reservaRepository: ReservaRepository
  ) {}

  async execute(CancelarReservaDto: CancelarReservaDto): Promise<ReservaEntity> {
    const reserva_id = CancelarReservaDto.reserva_id
    const cliente_id = CancelarReservaDto.cliente_id
    const rol_usuario = CancelarReservaDto.rol_usuario
    const usuario_rol_id = CancelarReservaDto.usuario_rol_id

    const cliente = await new ObtenerClientePorId(this.clienteRespository).execute(cliente_id)

    if (cliente.getUsuarioId().toString() != CancelarReservaDto.usuario_token_id?.toString())
      throw CustomErrors.badRequest(
        'El usuario no se encuntrar habilitado para cambiar la infomacion de esta reserva'
      )

    const obtenerReservaPorIdDto = ObtenerReservaPorIdDto.crear({
      reserva_id,
      usuario_rol_id,
      rol_usuario
    })

    const reserva = await new ObtenerReservaPorId(this.reservaRepository).execute(
      obtenerReservaPorIdDto
    )

    if (reserva?.getClienteId().toString() != cliente_id?.toString())
      throw CustomErrors.badRequest(
        'El restaurante no se encuentra autorizado para modificar esta reserva'
      )

    if (reserva.getEstado() != EstadoReserva.PENDIENTE)
      throw CustomErrors.badRequest(
        `La reserva ya se encuentra ${reserva.getEstado().toLocaleLowerCase()}`
      )

    const actualizarReservaDto = ActualizarReservaDto.crear({
      estado_reserva: EstadoReserva.CANCELADA,
      reserva_id
    })

    const reservaActualizada = await this.reservaRepository.actualizarReserva(actualizarReservaDto)
    return reservaActualizada
  }
}
