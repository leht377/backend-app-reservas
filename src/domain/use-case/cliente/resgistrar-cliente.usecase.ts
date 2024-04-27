import { RegistrarClienteDto } from '../../dtos'
import { ClienteEntity, UsuarioEntity } from '../../entities'
import { ClienteRepository } from '../../repositories'

export class RegistrarCliente {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async execute(registrarClienteDto: RegistrarClienteDto): Promise<ClienteEntity> {
    const cliente = await this.clienteRepository.registrarCliente(registrarClienteDto)
    return cliente
  }
}
