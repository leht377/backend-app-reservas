import {
  RestauranteDataSource,
  RestauranteDetalladoEntity,
  RestauranteEntity,
  RestauranteRepository
} from '../../domain'
import { RegistrarRestauranteDto } from '../../domain/dtos/restaurante/registrar-restaurante.dto'

export class RestauranteRepositoryImpl implements RestauranteRepository {
  constructor(private readonly restauranteDataSource: RestauranteDataSource) {}
  obtenerRestaurantePorUsuarioId(id: string): Promise<RestauranteDetalladoEntity | null> {
    return this.restauranteDataSource.obtenerRestaurantePorUsuarioId(id)
  }
  obtenerRestaurantePorId(id: string): Promise<RestauranteDetalladoEntity> {
    return this.restauranteDataSource.obtenerRestaurantePorId(id)
  }
  registrarRestaurante(
    registrarRestauranteDto: RegistrarRestauranteDto
  ): Promise<RestauranteEntity> {
    return this.restauranteDataSource.registrarRestaurante(registrarRestauranteDto)
  }
}
