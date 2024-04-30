import {
  ClienteDataSource,
  ClienteDetalladoEntity,
  ClienteEntity,
  ClienteRepository,
  OptionsRegistrarCliente,
  RegistrarClienteDto
} from '../../domain'

export class ClienteRepositoryImpl implements ClienteRepository {
  constructor(private readonly clienteDatasource: ClienteDataSource) {}
  obtenerClientePorUsuarioId(id: string): Promise<ClienteDetalladoEntity | null> {
    return this.clienteDatasource.obtenerClientePorUsuarioId(id)
  }
  obtenerClientePorId(id: string): Promise<ClienteDetalladoEntity> {
    return this.clienteDatasource.obtenerClientePorId(id)
  }

  registrarCliente(
    registrarClienteDto: RegistrarClienteDto,
    options?: OptionsRegistrarCliente | undefined
  ): Promise<ClienteEntity> {
    return this.clienteDatasource.registrarCliente(registrarClienteDto, options)
  }
}
