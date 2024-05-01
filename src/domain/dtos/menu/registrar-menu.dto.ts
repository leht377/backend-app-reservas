import { CustomErrors } from '../../errors'

export class RegistrarMenuDto {
  private constructor(public readonly restaurante_id: string, public readonly usuario_id: string) {}

  static crear(objecto: { [key: string]: any }): RegistrarMenuDto {
    const { restaurante_id, usuario_id } = objecto
    if (!restaurante_id) throw CustomErrors.badRequest('El id del restaurante es requerido')
    if (!usuario_id) throw CustomErrors.badRequest('El id del usuario es requerido')
    return new RegistrarMenuDto(restaurante_id, usuario_id)
  }
}
