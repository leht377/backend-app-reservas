import { CustomErrors, UsuarioEntity } from '../../domain'

export class UsuarioMapper {
  static UsuarioEntityFromObject(object: { [key: string]: any }): UsuarioEntity {
    const { _id, id, rol, correo, contrasena } = object
    const usuario_id = _id || id
    if (!usuario_id) throw CustomErrors.internalServer('id del usuario perdido')
    if (!rol) throw CustomErrors.internalServer('rol del usuario perdido')
    if (!correo) throw CustomErrors.internalServer('correo del usuario perdido')
    return new UsuarioEntity(usuario_id, rol, correo, contrasena)
  }
}
