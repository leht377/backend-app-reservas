import { CustomErrors } from '../../errors'
import { ObjectoGenerico } from '../../types'

export class AgregarFavoritoDto {
  private constructor(public readonly restaurante_id: string, public readonly cliente_id: string) {}

  static crear(object: ObjectoGenerico): AgregarFavoritoDto {
    const { restaurante_id, cliente_id } = object
    if (!restaurante_id) throw CustomErrors.badRequest('El campo restaurante_id es requerido')
    if (!cliente_id) throw CustomErrors.badRequest('El campo cliente_id es requerido')
    return new AgregarFavoritoDto(restaurante_id, cliente_id)
  }
}
