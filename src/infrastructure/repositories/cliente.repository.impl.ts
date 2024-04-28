import {
  ClienteDataSource,
  ClienteEntity,
  ClienteRepository,
  OptionsRegistrarCliente,
  RegistrarClienteDto
} from '../../domain'

export class ClienteRepositoryImpl implements ClienteRepository {
  constructor(private readonly clienteDatasource: ClienteDataSource) {}

  registrarCliente(
    registrarClienteDto: RegistrarClienteDto,
    options?: OptionsRegistrarCliente | undefined
  ): Promise<ClienteEntity> {
    return this.clienteDatasource.registrarCliente(registrarClienteDto, options)
  }
}
