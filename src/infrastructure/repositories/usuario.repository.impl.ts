import { CrearUsuarioDto, UsuarioDataSource, UsuarioEntity, UsuarioRepository } from '../../domain'

export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(private readonly usuarioDataSource: UsuarioDataSource) {}

  crearUsuario(
    crearUsuarioDto: CrearUsuarioDto,
    session: unknown = undefined
  ): Promise<UsuarioEntity> {
    return this.usuarioDataSource.crearUsuario(crearUsuarioDto, session)
  }
  obetenerUsuarioPorId(id: string): Promise<UsuarioEntity> {
    throw new Error('Method not implemented.')
  }
}
