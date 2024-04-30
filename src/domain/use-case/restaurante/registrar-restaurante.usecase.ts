import { RegistrarRestauranteDto } from '../../dtos/restaurante/registrar-restaurante.dto'
import { RestauranteEntity } from '../../entities'
import { RestauranteRepository } from '../../repositories'

export class RegistrarRestaurante {
  constructor(private readonly restauranteRepository: RestauranteRepository) {}
  async execute(
    registrarRestauranteDto: RegistrarRestauranteDto,
    session?: any
  ): Promise<RestauranteEntity> {
    const restaurante = await this.restauranteRepository.registrarRestaurante(
      registrarRestauranteDto,
      { session }
    )
    return restaurante
  }
}
