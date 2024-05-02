import { CategoriaEntity, CustomErrors } from '../../domain'

export class CategoriaMapper {
  static CategoriaEntityFromObject(object: { [key: string]: any }): CategoriaEntity {
    const { nombre, id, _id } = object

    const categoria_id = id || _id

    if (!nombre) throw CustomErrors.internalServer('Nombre de la categoria perdido')
    if (!categoria_id) throw CustomErrors.internalServer('id de la categoria perdida')

    return new CategoriaEntity(categoria_id, nombre)
  }
}
