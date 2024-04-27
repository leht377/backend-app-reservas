import { RegistrarUsuarioDto } from '../dtos'
import { UsuarioEntity } from '../entities'

export abstract class UsuarioRepository {
  abstract registrarUsuario(registrarUsuarioDto: RegistrarUsuarioDto): Promise<UsuarioEntity>
}
