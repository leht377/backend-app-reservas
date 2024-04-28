import { ClienteDetalladoEntity } from '../../entities'
import { ClienteRepository } from '../../repositories'

export class ObtenerClientePorId {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async execute(id: string): Promise<ClienteDetalladoEntity> {
    const cliente = await this.clienteRepository.obtenerClientePorId(id)
    return cliente
  }
}
