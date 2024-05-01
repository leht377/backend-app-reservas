import { ActualizarRestauranteDto } from '../../dtos'
import { RestauranteDetalladoEntity } from '../../entities'
import { CustomErrors } from '../../errors'
import { RestauranteRepository } from '../../repositories'

export class ActualizarRestaurante {
  constructor(private readonly restauranteRepository: RestauranteRepository) {}
  async execute(
    actualizarRestauranteDto: ActualizarRestauranteDto,
    session?: any
  ): Promise<RestauranteDetalladoEntity | null> {
    const restaurante = await this.restauranteRepository.obtenerRestaurantePorUsuarioId(
      actualizarRestauranteDto.usuario_id
    )

    if (restaurante?.getId().toString() != actualizarRestauranteDto.id?.toString())
      throw CustomErrors.badRequest('El restaurante solo puede modifcar su información : )')

    if (restaurante?.getUsuarioId() != actualizarRestauranteDto.usuario_id?.toString())
      throw CustomErrors.badRequest('El restaurante solo puede modifcar su información : (')

    const restauranteActualizado = await this.restauranteRepository.actualizarRestaurante(
      actualizarRestauranteDto,
      { session: session }
    )

    return restauranteActualizado
  }
}
