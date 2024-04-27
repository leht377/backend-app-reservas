import { RegistrarClienteDto } from '../dtos/cliente/registrar-cliente.dto'
import { ClienteEntity } from '../entities'

export abstract class ClienteDataSource {
  abstract registrarCliente(registrarClienteDto: RegistrarClienteDto): Promise<ClienteEntity>
}
