import { UsuarioRol } from '../../../common/utils'
import { CrearClienteDto, CrearClienteUsuarioDto, CrearUsuarioDto } from '../../dtos'
import { ClienteEntity } from '../../entities'
import { CustomErrors } from '../../errors'
import { ClienteRepository, UsuarioRepository } from '../../repositories'
import { CrearUsuario } from '../usuario'

interface CrearClienteUseCase {
  execute(crearClienteUsuarioDto: CrearClienteUsuarioDto, session: any): Promise<ClienteEntity>
}

export class CrearCliente implements CrearClienteUseCase {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly usuarioRepository: UsuarioRepository
  ) {}

  async execute(
    crearClienteUsuarioDto: CrearClienteUsuarioDto,
    session: any
  ): Promise<ClienteEntity> {
    const [error, crearUsuarioDto] = CrearUsuarioDto.crear({
      ...crearClienteUsuarioDto,
      rol: UsuarioRol.CLIENTE
    })

    if (error) throw CustomErrors.badRequest(error)

    const usuario = await new CrearUsuario(this.usuarioRepository).execute(
      crearUsuarioDto!,
      session
    )
    const usuario_id = usuario?.id

    const [errorCliente, crearClienteDto] = CrearClienteDto.crear({
      ...crearClienteUsuarioDto,
      usuario_id: usuario_id
    })

    if (errorCliente) CustomErrors.badRequest(errorCliente)
    const cliente = await this.clienteRepository.crearCliente(crearClienteDto!, usuario, session)
    return cliente
  }
}
