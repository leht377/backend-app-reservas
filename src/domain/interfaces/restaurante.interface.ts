import { RestauranteDetalladoEntity } from '../entities'
import { ResultadoPaginado } from './resultadoPaginado.interface'

export interface OptionsRegistrarRestaurante {
  session?: any
}

export interface OptionsActualizarRestaurante {
  session?: any
}

export interface RestaurantesConPaginacion {
  restaurantes: RestauranteDetalladoEntity[] | []
  paginacion: ResultadoPaginado
}
