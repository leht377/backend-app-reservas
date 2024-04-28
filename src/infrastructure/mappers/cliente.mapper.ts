import { ClienteDetalladoEntity, ClienteEntity, CustomErrors, UsuarioEntity } from '../../domain'

export class ClienteMapper {
  static ClienteEntityFromObject(object: { [key: string]: any }): ClienteEntity {
    const { _id, id, usuario_id, nombre, apellido, restaurantes_favoritos_ids } = object
    const cliente_id = _id || id

    if (!cliente_id) throw CustomErrors.internalServer('id del cliente perdido')
    if (!nombre) throw CustomErrors.internalServer('nombre del cliente perdido')
    if (!apellido) throw CustomErrors.internalServer('apellido del cliente perdido')
    if (!usuario_id) throw CustomErrors.internalServer('usuario_id del cliente perdido')
    if (!restaurantes_favoritos_ids)
      throw CustomErrors.internalServer('restaurantes_favoritos_ids del cliente perdido')

    return new ClienteEntity(cliente_id, usuario_id, nombre, apellido, restaurantes_favoritos_ids)
  }

  static ClienteDetalladoEntityFromObject(object: { [key: string]: any }): ClienteDetalladoEntity {
    const { usuario_id, ...restObj } = object
    const { rol, correo, id, _id } = usuario_id

    const idUsuario = _id || id

    if (!rol) throw CustomErrors.internalServer('rol del cliente perdido')
    if (!correo) throw CustomErrors.internalServer('correo del cliente perdido')

    const clienteEntity = this.ClienteEntityFromObject({ ...restObj, usuario_id: idUsuario })

    return new ClienteDetalladoEntity(
      clienteEntity.getId(),
      clienteEntity.getUsuarioId(),
      clienteEntity.getNombre(),
      clienteEntity.getApellido(),
      clienteEntity.getRestaurantesFavoritosIds(),
      rol,
      correo
    )
  }
}
