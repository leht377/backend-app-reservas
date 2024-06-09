import { UsuarioRol } from '../../../common/utils'
import { JwtAdapter } from '../../../common/utils/jwt'
import {
  RegistrarClienteDto,
  RegistrarClienteUsuarioDto,
  RegistrarUsuarioDto
} from '../../dtos'
import { CustomErrors } from '../../errors'
import { TokenPayload, UserToken } from '../../interfaces'
import { ClienteRepository, UsuarioRepository } from '../../repositories'
import { RegistrarCliente } from '../cliente'
import { RegistrarUsuario } from '../usuario'

type SignToken = (
  payload: TokenPayload,
  duration?: string
) => Promise<string | null>
// type TransationManager = (fn: (session: any) => Promise<any>) => Promise<void>

export class RegistrarClienteUsuario {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly clienteRepository: ClienteRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
    private readonly singRefreshToken: SignToken = JwtAdapter.generateRefreshToken
  ) {}

  async execute(
    registrarClienteUsuarioDto: RegistrarClienteUsuarioDto,
    session?: unknown
  ): Promise<UserToken> {
    const registrarUsuarioDto = RegistrarUsuarioDto.crear({
      ...registrarClienteUsuarioDto,
      rol: UsuarioRol.CLIENTE
    })

    const usuario = await new RegistrarUsuario(this.usuarioRepository).execute(
      registrarUsuarioDto,
      session
    )

    const registrarClienteDto = RegistrarClienteDto.crear({
      ...registrarClienteUsuarioDto,
      usuario_id: usuario?.getId()
    })

    const cliente = await new RegistrarCliente(this.clienteRepository).execute(
      registrarClienteDto,
      session
    )

    const tokenPayload: TokenPayload = {
      correo: usuario?.getCorreo(),
      usuario_id: usuario?.getId(),
      id: cliente?.getId(),
      rol: usuario.getRol()
    }
    const token = await this.signToken(tokenPayload)
    const refreshToken = await this.singRefreshToken(tokenPayload, '1d')

    if (!token) throw CustomErrors.internalServer('Token no pudo ser firmado')
    if (!refreshToken)
      throw CustomErrors.internalServer('refreshToken no pudo ser firmado')
    return {
      token: token,
      refreshToken: refreshToken,
      usuario: {
        id: usuario.getId(),
        correo: usuario.getCorreo(),
        rol: usuario.getRol(),
        rol_usuario_id: cliente?.getId()
      }
    }
  }
}
