import {
  ActualizarRestauranteDto,
  OptionsActualizarRestaurante,
  RestauranteDataSource,
  RestauranteDetalladoEntity,
  RestauranteEntity,
  RestauranteRepository,
  RestaurantesConPaginacion
} from '../../domain'
import { ObtenerRestauranteDto } from '../../domain/dtos/restaurante/obtener-restaurantes.dto'
import { RegistrarRestauranteDto } from '../../domain/dtos/restaurante/registrar-restaurante.dto'

export class RestauranteRepositoryImpl implements RestauranteRepository {
  constructor(private readonly restauranteDataSource: RestauranteDataSource) {}

  actualizarRestaurante(
    actualizarRestauranteDto: ActualizarRestauranteDto,
    options?: OptionsActualizarRestaurante | undefined
  ): Promise<RestauranteDetalladoEntity> {
    return this.restauranteDataSource.actualizarRestaurante(actualizarRestauranteDto, options)
  }

  obtenerRestaurantes(
    obtenerRestauranteDto: ObtenerRestauranteDto
  ): Promise<RestaurantesConPaginacion> {
    return this.restauranteDataSource.obtenerRestaurantes(obtenerRestauranteDto)
  }

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
