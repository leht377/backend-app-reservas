import { RegistrarUsuarioDto } from '../dtos'
import { UsuarioEntity } from '../entities'
import { OptionsRegistrarUsuario } from '../interfaces'

export abstract class UsuarioRepository {
  abstract registrarUsuario(
    registrarUsuarioDto: RegistrarUsuarioDto,
    options?: OptionsRegistrarUsuario
  ): Promise<UsuarioEntity>
}
