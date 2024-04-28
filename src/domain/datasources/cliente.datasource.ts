import { RegistrarClienteDto } from '../dtos/cliente/registrar-cliente.dto'
import { ClienteEntity } from '../entities'
import { OptionsRegistrarCliente } from '../interfaces'

export abstract class ClienteDataSource {
  abstract registrarCliente(
    registrarClienteDto: RegistrarClienteDto,
    options?: OptionsRegistrarCliente
  ): Promise<ClienteEntity>
}
