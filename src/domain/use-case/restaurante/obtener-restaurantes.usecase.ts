import { ObtenerRestauranteDto } from '../../dtos/restaurante/obtener-restaurantes.dto'
import { RestauranteDetalladoEntity } from '../../entities'
import { RestaurantesConPaginacion } from '../../interfaces'
import { RestauranteRepository } from '../../repositories'

export class ObtenerRestaurantes {
  constructor(private readonly restauranteRepository: RestauranteRepository) {}
  async execute(obtenerRestauranteDto: ObtenerRestauranteDto): Promise<RestaurantesConPaginacion> {
    const restaurantes = await this.restauranteRepository.obtenerRestaurantes(obtenerRestauranteDto)
    return restaurantes
  }
}
