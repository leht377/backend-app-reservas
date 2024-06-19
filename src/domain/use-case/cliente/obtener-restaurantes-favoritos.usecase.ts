import { RestauranteDetalladoEntity } from '../../entities'
import { ClienteRepository, RestauranteRepository } from '../../repositories'

export class ObtnerRestaurantesFavoritos {
  constructor(private readonly clienteRepository: ClienteRepository) {}
  async execute(id_cliente: string): Promise<RestauranteDetalladoEntity[]> {
    const restaurante = await this.clienteRepository.obtenerRestaurantesFavoritos(id_cliente)
    return restaurante
  }
}
