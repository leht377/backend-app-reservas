import { CrearUsuarioDto } from '../../dtos/usuario/crear_usuario.dto'
import { UsuarioEntity } from '../../entities'
import { UsuarioRepository } from '../../repositories'

interface CrearUsuarioUseCase {
  execute(crearUsuarioDto: CrearUsuarioDto, session: unknown): Promise<UsuarioEntity>
}

export class CrearUsuario implements CrearUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(crearUsuarioDto: CrearUsuarioDto, session: unknown): Promise<UsuarioEntity> {
    return await this.usuarioRepository.crearUsuario(crearUsuarioDto, session)
  }
}
