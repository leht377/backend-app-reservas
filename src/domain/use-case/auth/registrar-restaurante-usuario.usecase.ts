import { UsuarioRol } from '../../../common/utils'
import { JwtAdapter } from '../../../common/utils/jwt'
import { RegistrarRestauranteUsuarioDto, RegistrarUsuarioDto } from '../../dtos'
import { RegistrarRestauranteDto } from '../../dtos/restaurante/registrar-restaurante.dto'
import { CustomErrors } from '../../errors'
import { TokenPayload, UserToken } from '../../interfaces'

import { RestauranteRepository, UsuarioRepository } from '../../repositories'
import { RegistrarRestaurante } from '../restaurante'
import { RegistrarUsuario } from '../usuario'
type SignToken = (payload: TokenPayload, duration?: string) => Promise<string | null>
export class RegistrarRestauranteUsuario {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly restauranteRepository: RestauranteRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}
  async execute(
    resgistrarRestauranteUsuarioDto: RegistrarRestauranteUsuarioDto,
    session?: any
  ): Promise<UserToken> {
    const registrarUsuarioDto = RegistrarUsuarioDto.crear({
      ...resgistrarRestauranteUsuarioDto,
      rol: UsuarioRol.RESTAURANTE
    })

    const usuario = await new RegistrarUsuario(this.usuarioRepository).execute(
      registrarUsuarioDto,
      session
    )

    const registrarRestuaranteDto = RegistrarRestauranteDto.crear({
      ...resgistrarRestauranteUsuarioDto,
      usuario_id: usuario?.getId()
    })

    const restaurante = await new RegistrarRestaurante(this.restauranteRepository).execute(
      registrarRestuaranteDto,
      session
    )

    const tokenPayload: TokenPayload = {
      correo: usuario?.getCorreo(),
      usuario_id: usuario?.getId(),
      id: restaurante?.getId(),
      rol: usuario.getRol()
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
