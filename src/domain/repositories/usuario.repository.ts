import { CrearUsuarioDto } from '../dtos/usuario/crear_usuario.dto'
import { UsuarioEntity } from '../entities'

export abstract class UsuarioRepository {
  abstract crearUsuario(crearUsuarioDto: CrearUsuarioDto, session: any): Promise<UsuarioEntity>
  abstract obetenerUsuarioPorId(id: string): Promise<UsuarioEntity>
}
