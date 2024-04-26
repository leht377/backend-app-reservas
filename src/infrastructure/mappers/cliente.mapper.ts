import { ClienteEntity, CustomErrors } from '../../domain'

export class ClienteMapper {
  static clienteEntityFromObject(object: { [key: string]: any }) {
    const { _id, id, nombre, apellido, restaurantes_favoritos_ids, correo, rol } = object

    const cliente_id = _id || id
    if (!cliente_id) throw CustomErrors.badRequest('id perdido')
    if (!nombre) throw CustomErrors.badRequest('nombre perdido')
    if (!apellido) throw CustomErrors.badRequest('apellido perdido')
    if (!restaurantes_favoritos_ids)
      throw CustomErrors.badRequest('restaurantes_favoritos_ids perdido')
    if (!correo) throw CustomErrors.badRequest('correo perdido')
    if (!rol) throw CustomErrors.badRequest('rol perdido')

    return new ClienteEntity(cliente_id, nombre, apellido, restaurantes_favoritos_ids, correo, rol)
  }
}
