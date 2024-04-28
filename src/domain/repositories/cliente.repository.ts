import { RegistrarClienteDto } from '../dtos/cliente/registrar-cliente.dto'
import { ClienteDetalladoEntity, ClienteEntity } from '../entities'
import { OptionsRegistrarCliente } from '../interfaces'

export abstract class ClienteRepository {
  abstract registrarCliente(
    registrarClienteDto: RegistrarClienteDto,
    options?: OptionsRegistrarCliente
  ): Promise<ClienteEntity>

  abstract obtenerClientePorId(id: string): Promise<ClienteDetalladoEntity>
}
