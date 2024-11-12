import { EstadoReserva } from '../../../common/utils'
import { ActualizarReservaDto, ObtenerReservaPorIdDto, RechazarReservaDto } from '../../dtos'
import { ReservaEntity } from '../../entities'
import { CustomErrors } from '../../errors'
import { ClienteRepository, ReservaRepository, RestauranteRepository } from '../../repositories'
import { ObtenerReservaPorId } from './obtener-reserva-por-id.usecase'
import { ObtenerRestaurantePorId } from '../restaurante/obtener-restaurante-por-id.usecase'
import { EmailRepository } from '../../repositories/email.repository'
import { ObtenerClientePorId } from '../cliente'
import { SentEmail } from '../email/sent-email.usecase'
import { AsuntoEmailReservas, TypePlantillaEmail } from '../../../common/utils/enums/email.enum'

export class RechazarReserva {
  constructor(
    private readonly reservaRepository: ReservaRepository,
    private readonly restauranteRepository: RestauranteRepository,
    private readonly clienteRepository: ClienteRepository,
    private readonly emailRepository: EmailRepository
  ) {}

  async execute(rechazarReservaDto: RechazarReservaDto): Promise<ReservaEntity> {
    const reserva_id = rechazarReservaDto.reserva_id
    const restaurante_id = rechazarReservaDto.restaurante_id
    const rol_usuario = rechazarReservaDto.rol_usuario
    const usuario_rol_id = rechazarReservaDto.usuario_rol_id
    const motivio_rechazo = rechazarReservaDto.motivo_rechazo

    const restaurante = await new ObtenerRestaurantePorId(this.restauranteRepository).execute(
      restaurante_id
    )

    if (restaurante.getUsuarioId().toString() != rechazarReservaDto.usuario_token_id?.toString())
      throw CustomErrors.badRequest(
        'El usuario no se encuntrar habilitado para cambiar la infomacion de este restaurante'
      )

    const obtenerReservaPorIdDto = ObtenerReservaPorIdDto.crear({
      reserva_id,
      usuario_rol_id,
      rol_usuario
    })

    const reserva = await new ObtenerReservaPorId(this.reservaRepository).execute(
      obtenerReservaPorIdDto
    )

    if (reserva?.getRestauranteId().toString() != restaurante_id?.toString())
      throw CustomErrors.badRequest(
        'El restaurante no se encuentra autorizado para modificar esta reserva'
      )

    if (reserva.getEstado() != EstadoReserva.PENDIENTE)
      throw CustomErrors.badRequest(
        `La reserva ya se encuentra ${reserva.getEstado().toLocaleLowerCase()}`
      )

    const actualizarReservaDto = ActualizarReservaDto.crear({
      estado_reserva: EstadoReserva.RECHAZADA,
      reserva_id,
      motivio_rechazo: motivio_rechazo
    })
  
    const reservaActualizada = await this.reservaRepository.actualizarReserva(actualizarReservaDto)

    const cliente = await new ObtenerClientePorId(this.clienteRepository).execute(
      reservaActualizada.getClienteId()
    )

    await new SentEmail(this.emailRepository).execute(
      cliente.getCorreo,
      AsuntoEmailReservas.RECHAZADA,
      TypePlantillaEmail.RESERVA_RECHAZADA_CLIENTE,
      cliente,
      restaurante,
      reservaActualizada
    )
    return reservaActualizada
  }
}
