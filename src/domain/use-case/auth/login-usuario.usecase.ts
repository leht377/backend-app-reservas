import { UsuarioRol } from '../../../common/utils'
import { BcryptAdapter } from '../../../common/utils/bcrypt'
import { JwtAdapter } from '../../../common/utils/jwt'
import { LoginUsuarioDto } from '../../dtos'
import { CustomErrors } from '../../errors'
import { TokenPayload, UserToken } from '../../interfaces'
import {
  ClienteRepository,
  RestauranteRepository,
  UsuarioRepository
} from '../../repositories'
type SignToken = (
  payload: TokenPayload,
  duration?: string
) => Promise<string | null>
export class LoginUsuario {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly restauranteRepository: RestauranteRepository,
    private readonly clienteRepository: ClienteRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
    private readonly singRefreshToken: SignToken = JwtAdapter.generateRefreshToken
  ) {}
  async execute(loginUsuarioDto: LoginUsuarioDto): Promise<UserToken> {
    const usuario = await this.usuarioRepository.obtenerUsuarioPorCorreo(
      loginUsuarioDto.correo
    )

    if (!usuario) throw CustomErrors.unautorized('correo o contraseña invalido')
    if (
      !BcryptAdapter.compare(
        loginUsuarioDto.contrasena,
        usuario.getContrasenaHash() || ''
      )
    )
      throw CustomErrors.unautorized('correo o contraseña invalido')

    let tokenPayload: TokenPayload
    let rol_usuario_id
    if (usuario.getRol() === UsuarioRol.CLIENTE) {
      const cliente = await this.clienteRepository.obtenerClientePorUsuarioId(
        usuario.getId()
      )
      if (!cliente)
        throw CustomErrors.internalServer(
          `No se encontro ningun cliente asociado al usuario id: ${usuario.getId()}`
        )
      rol_usuario_id = cliente.getId()
      tokenPayload = {
        correo: usuario?.getCorreo(),
        usuario_id: usuario?.getId(),
        id: cliente?.getId(),
        rol: usuario.getRol()
      }
    } else if (usuario.getRol() === UsuarioRol.RESTAURANTE) {
      const restaurante =
        await this.restauranteRepository.obtenerRestaurantePorUsuarioId(
          usuario.getId()
        )
      if (!restaurante)
        throw CustomErrors.internalServer(
          `No se encontro ningun restaurante asociado al usuario id: ${usuario.getId()}`
        )
      rol_usuario_id = restaurante.getId()
      tokenPayload = {
        correo: usuario?.getCorreo(),
        usuario_id: usuario?.getId(),
        id: restaurante?.getId(),
        rol: restaurante.getRol()
      }
    } else {
      throw CustomErrors.internalServer('Rol usuario no encontrado')
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
        rol_usuario_id: rol_usuario_id
      }
    }
  }
}
