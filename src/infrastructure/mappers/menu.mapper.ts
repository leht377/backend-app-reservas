import { CustomErrors, MenuEntity } from '../../domain'

export class MenuMapper {
  static MenuEntityFromObject(object: { [key: string]: any }): MenuEntity {
    const { _id, id, platos_ids, restaurante_id } = object
    const idMenu = _id || id

    if (!idMenu) throw CustomErrors.internalServer('id del menu perdido')
    if (!platos_ids) throw CustomErrors.internalServer('platos_ids perdido')
    if (!Array.isArray(platos_ids))
      throw CustomErrors.internalServer('platos_ids debe ser un array')
    if (!restaurante_id) throw CustomErrors.internalServer('restaurante_id del menu perdido')

    return new MenuEntity(idMenu, restaurante_id, platos_ids)
  }
}
