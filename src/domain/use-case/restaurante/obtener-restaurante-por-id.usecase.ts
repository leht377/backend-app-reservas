import { RestauranteDetalladoEntity } from '../../entities'
import { RestauranteRepository } from '../../repositories'

export class ObtenerRestaurantePorId {
  constructor(private readonly restauranteRepository: RestauranteRepository) {}

  async execute(id: string): Promise<RestauranteDetalladoEntity> {
    const restaurante = await this.restauranteRepository.obtenerRestaurantePorId(id)
    return restaurante
  }
}
