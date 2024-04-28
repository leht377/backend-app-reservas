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
