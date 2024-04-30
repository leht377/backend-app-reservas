import { ObtenerRestauranteDto } from '../dtos/restaurante/obtener-restaurantes.dto'
import { RegistrarRestauranteDto } from '../dtos/restaurante/registrar-restaurante.dto'
import { RestauranteDetalladoEntity, RestauranteEntity } from '../entities'
import { OptionsRegistrarRestaurante, RestaurantesConPaginacion } from '../interfaces'

export abstract class RestauranteRepository {
  abstract registrarRestaurante(
    registrarRestauranteDto: RegistrarRestauranteDto,
    options?: OptionsRegistrarRestaurante
  ): Promise<RestauranteEntity>

  abstract obtenerRestaurantePorId(id: string): Promise<RestauranteDetalladoEntity>
  abstract obtenerRestaurantePorUsuarioId(id: string): Promise<RestauranteDetalladoEntity | null>
  abstract obtenerRestaurantes(
    obtenerRestauranteDto: ObtenerRestauranteDto
  ): Promise<RestaurantesConPaginacion>
}
