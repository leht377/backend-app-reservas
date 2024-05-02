import { CustomErrors } from '../../errors'

export class EliminarCategoriaDto {
  private constructor(public readonly categoria_id: string) {}
  static crear(objecto: { [key: string]: any }): EliminarCategoriaDto {
    const { categoria_id } = objecto
    if (!categoria_id) throw CustomErrors.badRequest('El id de la categoria es requerido')
    return new EliminarCategoriaDto(categoria_id)
  }
}
