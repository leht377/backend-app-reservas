import { UsuarioRol } from '../../../common/utils'
import { JwtAdapter } from '../../../common/utils/jwt'
import { RegistrarClienteDto, RegistrarClienteUsuarioDto, RegistrarUsuarioDto } from '../../dtos'
import { CustomErrors } from '../../errors'
import { ClienteRepository, UsuarioRepository } from '../../repositories'
import { RegistrarCliente } from '../cliente'
import { RegistrarUsuario } from '../usuario'

interface UserToken {
  token: string
  usuario: {
    id: string
    correo: string
    rol: string
  }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

export class RegistrarClienteUsuario {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly clienteRepository: ClienteRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}
  async execute(registrarClienteUsuarioDto: RegistrarClienteUsuarioDto): Promise<UserToken> {
    const registrarUsuarioDto = RegistrarUsuarioDto.crear({
      ...registrarClienteUsuarioDto,
      rol: UsuarioRol.CLIENTE
    })

    const usuario = await new RegistrarUsuario(this.usuarioRepository).execute(registrarUsuarioDto)

    const registrarClienteDto = RegistrarClienteDto.crear({
      ...registrarClienteUsuarioDto,
      usuario_id: usuario?.id
    })
    const cliente = await new RegistrarCliente(this.clienteRepository).execute(registrarClienteDto)

    const token = await this.signToken({
      correo: usuario?.correo,
      usuario_id: usuario?.id,
      id: cliente?.id
    })
    if (!token) throw CustomErrors.internalServer('Token no pudo ser firmado')

    return {
      token: token,
      usuario: {
        id: usuario.id,
        correo: usuario.correo,
        rol: usuario.rol
      }
    }
  }
}
