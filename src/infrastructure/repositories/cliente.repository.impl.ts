import {
  ClienteEntity,
  ClienteRepository,
  CrearClienteDto,
  UsuarioEntity,
  clienteDataSource
} from '../../domain'

export class ClienteRepositoryImpl implements ClienteRepository {
  constructor(private readonly clienteDataSource: clienteDataSource) {}

  crearCliente(
    crearClienteDto: CrearClienteDto,
    usuarioEntity: UsuarioEntity,
    session: unknown = undefined
  ): Promise<ClienteEntity> {
    return this.clienteDataSource.crearCliente(crearClienteDto, usuarioEntity, session)
  }
  obtenerClientes(): Promise<ClienteEntity[]> {
    throw new Error('Method not implemented.')
  }
}
