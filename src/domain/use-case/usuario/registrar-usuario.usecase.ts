import { BcryptAdapter } from '../../../common/utils/bcrypt'
import { RegistrarUsuarioDto } from '../../dtos'
import { UsuarioEntity } from '../../entities'
import { UsuarioRepository } from '../../repositories'

export class RegistrarUsuario {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}
  async execute(registrarUsuarioDto: RegistrarUsuarioDto): Promise<UsuarioEntity> {
    const hashPassword = BcryptAdapter.hash(registrarUsuarioDto.contrasena)

    const registrarUsuarioHasPasswordDto = RegistrarUsuarioDto.crear({
      ...registrarUsuarioDto,
      contrasena: hashPassword
    })

    const usuario = await this.usuarioRepository.registrarUsuario(registrarUsuarioHasPasswordDto)
    return usuario
  }
}
