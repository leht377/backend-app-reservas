import { RegistrarUsuarioDto } from '../dtos'
import { UsuarioEntity } from '../entities'
import { OptionsRegistrarUsuario } from '../interfaces'

export abstract class UsuarioDataSource {
  abstract registrarUsuario(
    registrarUsuarioDto: RegistrarUsuarioDto,
    options?: OptionsRegistrarUsuario
  ): Promise<UsuarioEntity>
  abstract obtenerUsuarioPorCorreo(correo: string): Promise<UsuarioEntity | null>
}
