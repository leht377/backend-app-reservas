import { RegistrarClienteDto } from '../dtos/cliente/registrar-cliente.dto'
import { ClienteEntity } from '../entities'

export abstract class ClienteRepository {
  abstract registrarCliente(registrarClienteDto: RegistrarClienteDto): Promise<ClienteEntity>
}
