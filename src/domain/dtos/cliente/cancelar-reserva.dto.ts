import { CustomErrors } from '../../errors'
import { ObjectoGenerico } from '../../types'

export class CancelarReservaDto {
  private constructor(
    public readonly reserva_id: string,
    public readonly cliente_id: string,
    public readonly usuario_token_id: string,
    public readonly rol_usuario: string,
    public readonly usuario_rol_id: string
  ) {}

  static crear(objecto: ObjectoGenerico): CancelarReservaDto {
    const { reserva_id, cliente_id, usuario_token_id, rol_usuario, usuario_rol_id } = objecto

    if (!reserva_id) throw CustomErrors.badRequest('El campo "reserva_id" es requerido')
    if (!cliente_id) throw CustomErrors.badRequest('El campo "cliente_id" es requerido')
    if (!usuario_token_id) throw CustomErrors.badRequest('El campo "usuario_token_id" es requerido')
    if (!rol_usuario) throw CustomErrors.badRequest('El campo "rol_usuario" es requerido')
    if (!usuario_rol_id) throw CustomErrors.badRequest('El campo "usuario_rol_id" es requerido')

    return new CancelarReservaDto(
      reserva_id,
      cliente_id,
      usuario_token_id,
      rol_usuario,
      usuario_rol_id
    )
  }
}
