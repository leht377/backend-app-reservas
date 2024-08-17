import { DeleteFotoIntalacionDto } from '../../dtos'
import { RestauranteDetalladoEntity } from '../../entities'
import { RestauranteRepository } from '../../repositories'

export class DeleteFotoIntalacion {
  constructor(private readonly restauranteRepository: RestauranteRepository) {}
  async execute(
    deleteFotoIntalacionDto: DeleteFotoIntalacionDto
  ): Promise<RestauranteDetalladoEntity> {
    // const restauranteEnBd = await this.restauranteRepository.obtenerRestaurantePorId(
    //   deleteFotoIntalacionDto.restaurante_id
    // )
    const restaurante = await this.restauranteRepository.deletefotoInstalacion(
      deleteFotoIntalacionDto
    )
    return restaurante
  }
}
