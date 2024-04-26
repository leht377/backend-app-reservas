import { CustomErrors, UsuarioEntity } from '../../domain'

export class UsuarioMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { _id, id, correo, rol } = object

    if (!_id && !id) throw CustomErrors.badRequest('El ID es requerido.')

    const usuarioId = _id || id

    if (!correo || !rol) throw CustomErrors.badRequest('Correo y rol son requeridos.')

    return new UsuarioEntity(usuarioId, correo, rol)
  }
}
