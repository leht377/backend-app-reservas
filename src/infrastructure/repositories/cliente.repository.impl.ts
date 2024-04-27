import {
  ClienteDataSource,
  ClienteEntity,
  ClienteRepository,
  RegistrarClienteDto
} from '../../domain'

export class ClienteRepositoryImpl implements ClienteRepository {
  constructor(private readonly clienteDatasource: ClienteDataSource) {}

  registrarCliente(registrarClienteDto: RegistrarClienteDto): Promise<ClienteEntity> {
    return this.clienteDatasource.registrarCliente(registrarClienteDto)
  }
}
