import { UsuarioRol } from '../../../common/utils'
import { ObtenerReservaPorIdDto } from '../../dtos'
import { ReservaEntity } from '../../entities'
import { CustomErrors } from '../../errors'
import { ReservaRepository } from '../../repositories'

export class ObtenerReservaPorId {
  constructor(private readonly reservaRepository: ReservaRepository) {}

  async execute(obtenerReservaPorIdDto: ObtenerReservaPorIdDto): Promise<ReservaEntity> {
    const reserva = await this.reservaRepository.obtenerReservaPorId(obtenerReservaPorIdDto)
    if (!reserva)
      throw CustomErrors.badRequest(
        `No existe ninguna reserva asociada al id: ${obtenerReservaPorIdDto.reserva_id}`
      )

    if (obtenerReservaPorIdDto.rol_usuario === UsuarioRol.RESTAURANTE) {
      if (
        reserva.getRestauranteId().toString() != obtenerReservaPorIdDto.usuario_rol_id?.toString()
      )
        throw CustomErrors.badRequest(
          'El usuario con rol restuarante no se encuentra autorizado para consultar esta reserva'
        )
    } else if (obtenerReservaPorIdDto.rol_usuario === UsuarioRol.CLIENTE) {
      if (reserva.getClienteId().toString() != obtenerReservaPorIdDto.usuario_rol_id?.toString())
        throw CustomErrors.badRequest(
          'El usuario con rol cliente no se encuentra autorizado para consultar esta reserva'
        )
    }

    return reserva
  }
}
