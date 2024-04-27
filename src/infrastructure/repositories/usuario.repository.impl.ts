import {
  RegistrarUsuarioDto,
  UsuarioDataSource,
  UsuarioEntity,
  UsuarioRepository
} from '../../domain'

export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(private readonly usuarioDataSource: UsuarioDataSource) {}
  registrarUsuario(registrarUsuarioDto: RegistrarUsuarioDto): Promise<UsuarioEntity> {
    return this.usuarioDataSource.registrarUsuario(registrarUsuarioDto)
  }
}
