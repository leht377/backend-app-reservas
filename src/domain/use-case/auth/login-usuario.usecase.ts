import { UsuarioRol } from '../../../common/utils'
import { BcryptAdapter } from '../../../common/utils/bcrypt'
import { JwtAdapter } from '../../../common/utils/jwt'
import { LoginUsuarioDto } from '../../dtos'
import { CustomErrors } from '../../errors'
import { TokenPayload, UserToken } from '../../interfaces'
import { ClienteRepository, RestauranteRepository, UsuarioRepository } from '../../repositories'
type SignToken = (payload: TokenPayload, duration?: string) => Promise<string | null>
export class LoginUsuario {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly restauranteRepository: RestauranteRepository,
    private readonly clienteRepository: ClienteRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}
  async execute(loginUsuarioDto: LoginUsuarioDto): Promise<UserToken> {
    const usuario = await this.usuarioRepository.obtenerUsuarioPorCorreo(loginUsuarioDto.correo)

    if (!usuario) throw CustomErrors.unautorized('correo o contraseña invalido')
    if (!BcryptAdapter.compare(loginUsuarioDto.contrasena, usuario.getContrasenaHash() || ''))
      throw CustomErrors.unautorized('correo o contraseña invalido')

    let tokenPayload: TokenPayload

    if (usuario.getRol() === UsuarioRol.CLIENTE) {
      const cliente = await this.clienteRepository.obtenerClientePorUsuarioId(usuario.getId())
      if (!cliente)
        throw CustomErrors.internalServer(
          `No se encontro ningun cliente asociado al usuario id: ${usuario.getId()}`
        )
      tokenPayload = {
        correo: usuario?.getCorreo(),
        usuario_id: usuario?.getId(),
        id: cliente?.getId(),
        rol: usuario.getRol()
      }
    } else if (usuario.getRol() === UsuarioRol.RESTAURANTE) {
      const restaurante = await this.restauranteRepository.obtenerRestaurantePorUsuarioId(
        usuario.getId()
      )
      if (!restaurante)
        throw CustomErrors.internalServer(
          `No se encontro ningun restaurante asociado al usuario id: ${usuario.getId()}`
        )

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

    if (!token) throw CustomErrors.internalServer('Token no pudo ser firmado')
    return {
      token: token,
      usuario: {
        id: usuario.getId(),
        correo: usuario.getCorreo(),
        rol: usuario.getRol()
      }
    }
  }
}