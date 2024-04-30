import { UsuarioRol } from '../../../common/utils'
import { RegistrarRestauranteUsuarioDto, RegistrarUsuarioDto } from '../../dtos'
import { RegistrarRestauranteDto } from '../../dtos/restaurante/registrar-restaurante.dto'
import { RestauranteEntity } from '../../entities'
import { RestauranteRepository, UsuarioRepository } from '../../repositories'
import { RegistrarRestaurante } from '../restaurante'
import { RegistrarUsuario } from '../usuario'
interface UserToken {
  token: string
  usuario: {
    id: string
    correo: string
    rol: string
  }
}

export class RegistrarRestauranteUsuario {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly restauranteRepository: RestauranteRepository
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
    return {
      token: 'token',
      usuario: {
        id: usuario.getId(),
        correo: usuario.getCorreo(),
        rol: usuario.getRol()
      }
    }
  }
}
