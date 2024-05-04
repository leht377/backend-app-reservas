import { AceptarReservaDto } from '../../dtos'
import { ReservaEntity } from '../../entities'
import { CustomErrors } from '../../errors'
import { ReservaRepository, RestauranteRepository } from '../../repositories'
import { ObtenerRestaurantePorId } from './obtener-restaurante-por-id.usecase'

export class AceptarReserva {
  constructor(
    private readonly restauranteRepository: RestauranteRepository,
    private readonly reservaRepository: ReservaRepository
  ) {}

  async execute(aceptarReservaDto: AceptarReservaDto): Promise<void> {
    const restaurante = await new ObtenerRestaurantePorId(this.restauranteRepository).execute(
      aceptarReservaDto.restaurante_id
    )

    if (restaurante.getUsuarioId().toString() != aceptarReservaDto.usuario_token_id?.toString())
      throw CustomErrors.badRequest(
        'El usuario no se encuntrar habilitado para cambiar la infomacion de este restaurante'
      )
  }
}
