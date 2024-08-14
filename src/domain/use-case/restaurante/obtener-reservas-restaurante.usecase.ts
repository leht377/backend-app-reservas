import { ObtnerReservaDto, ObtnerReservaRestauranteDto } from '../../dtos'
import { ReservaDetalladoEntity, ReservaEntity } from '../../entities'
import { ClienteRepository, ReservaRepository, RestauranteRepository } from '../../repositories'
import { ObtenerReservaPorId } from '../reserva'
import { ObtenerRestaurantePorId } from './obtener-restaurante-por-id.usecase'

export class ObtenerReservasRestaurante {
  constructor(
    private readonly reservaRepository: ReservaRepository,
    private readonly restauranteRepository: RestauranteRepository
  ) {}

  async execute(
    obtenerReservasDto: ObtnerReservaRestauranteDto
  ): Promise<ReservaDetalladoEntity[]> {
    const { restaurante_id } = obtenerReservasDto
    const restaurante = await new ObtenerRestaurantePorId(this.restauranteRepository).execute(
      restaurante_id
    )

    const reservas = await this.reservaRepository.obtenerReservasPorRestauranteId(
      obtenerReservasDto
    )
    return reservas
  }
}
