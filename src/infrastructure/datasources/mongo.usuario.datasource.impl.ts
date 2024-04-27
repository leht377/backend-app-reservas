import { UsuarioModel } from '../../data/mongodb'
import { RegistrarUsuarioDto, UsuarioDataSource, UsuarioEntity } from '../../domain'
import { UsuarioMapper } from '../mappers'

export class MongoUsuarioDataSourceImpl implements UsuarioDataSource {
  async registrarUsuario(registrarUsuarioDto: RegistrarUsuarioDto): Promise<UsuarioEntity> {
    // throw new Error('Method not implemented.')
    try {
      const usuario = new UsuarioModel({ ...registrarUsuarioDto })
      const usuarioCreado = await usuario.save()
      return UsuarioMapper.UsuarioEntityFromObject(usuarioCreado.toObject())
    } catch (error) {
      throw error
    }
  }
}
