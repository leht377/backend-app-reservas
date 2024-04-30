import { RegistrarRestauranteDto } from '../dtos/restaurante/registrar-restaurante.dto'
import { RestauranteEntity } from '../entities'
import { OptionsRegistrarRestaurante } from '../interfaces'

export abstract class RestauranteDataSource {
  abstract registrarRestaurante(
    registrarRestauranteDto: RegistrarRestauranteDto,
    options?: OptionsRegistrarRestaurante
  ): Promise<RestauranteEntity>
}
