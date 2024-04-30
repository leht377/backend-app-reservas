import {
  OptionsRegistrarUsuario,
  RegistrarUsuarioDto,
  UsuarioDataSource,
  UsuarioEntity,
  UsuarioRepository
} from '../../domain'

export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(private readonly usuarioDataSource: UsuarioDataSource) {}
  obtenerUsuarioPorCorreo(correo: string): Promise<UsuarioEntity | null> {
    return this.usuarioDataSource.obtenerUsuarioPorCorreo(correo)
  }
  registrarUsuario(
    registrarUsuarioDto: RegistrarUsuarioDto,
    options?: OptionsRegistrarUsuario | undefined
  ): Promise<UsuarioEntity> {
    return this.usuarioDataSource.registrarUsuario(registrarUsuarioDto, options)
  }
}
