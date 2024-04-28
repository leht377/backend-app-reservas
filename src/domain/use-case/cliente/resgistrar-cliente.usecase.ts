import { RegistrarClienteDto } from '../../dtos'
import { ClienteEntity, UsuarioEntity } from '../../entities'
import { ClienteRepository } from '../../repositories'

export class RegistrarCliente {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async execute(
    registrarClienteDto: RegistrarClienteDto,
    session?: unknown
  ): Promise<ClienteEntity> {
    const cliente = await this.clienteRepository.registrarCliente(registrarClienteDto, { session })
    return cliente
  }
}
