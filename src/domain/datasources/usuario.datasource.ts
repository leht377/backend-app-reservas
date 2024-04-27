import { RegistrarUsuarioDto } from '../dtos'
import { UsuarioEntity } from '../entities'

export abstract class UsuarioDataSource {
  abstract registrarUsuario(registrarUsuarioDto: RegistrarUsuarioDto): Promise<UsuarioEntity>
}
