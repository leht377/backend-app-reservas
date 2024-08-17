import { CustomErrors } from '../../errors'

export class DeleteFotoIntalacionDto {
  private constructor(public readonly foto_id: string, public readonly restaurante_id: string) {}

  static crear(object: { [key: string]: any }): DeleteFotoIntalacionDto {
    const { foto_id, restaurante_id } = object
    if (!foto_id) throw CustomErrors.badRequest('El campo "foto_id"  es requerido')
    if (!restaurante_id) throw CustomErrors.badRequest('El campo "restaurante_id"  es requerido')

    return new DeleteFotoIntalacionDto(foto_id, restaurante_id)
  }
}
