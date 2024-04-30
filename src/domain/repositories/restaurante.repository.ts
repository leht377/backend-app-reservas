import { RegistrarRestauranteDto } from '../dtos/restaurante/registrar-restaurante.dto'
import { RestauranteDetalladoEntity, RestauranteEntity } from '../entities'
import { OptionsRegistrarRestaurante } from '../interfaces'

export abstract class RestauranteRepository {
  abstract registrarRestaurante(
    registrarRestauranteDto: RegistrarRestauranteDto,
    options?: OptionsRegistrarRestaurante
  ): Promise<RestauranteEntity>

  abstract obtenerRestaurantePorId(id: string): Promise<RestauranteDetalladoEntity>
}
