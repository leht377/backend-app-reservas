import { CustomErrors } from '../../errors'
import { ObjectoGenerico } from '../../types'

export class ObtenerReservaPorIdDto {
  private constructor(
    public reserva_id: string,
    public usuario_rol_id: string,
    public rol_usuario: string
  ) {}

  static crear(objecto: ObjectoGenerico): ObtenerReservaPorIdDto {
    const { reserva_id, usuario_rol_id, rol_usuario } = objecto
    if (!reserva_id) throw CustomErrors.badRequest("El campo 'reserva_id' es requerido")
    if (!usuario_rol_id) throw CustomErrors.internalServer("El campo 'usuario_rol_id' es requerido")
    if (!rol_usuario) throw CustomErrors.internalServer("El campo 'rol_usuario' es requerido")
    return new ObtenerReservaPorIdDto(reserva_id, usuario_rol_id, rol_usuario)
  }
}
