import { SolicitarReservaDto } from '../../dtos'
import { ReservaEntity } from '../../entities'
import { CustomErrors } from '../../errors'
import { ClienteRepository, ReservaRepository, RestauranteRepository } from '../../repositories'
import { ObtenerClientePorId } from '../cliente'
import { ObtenerRestaurantePorId } from '../restaurante'

export class RegistrarReserva {
  constructor(
    private readonly reservaRepository: ReservaRepository,
    private readonly restauranteRepository: RestauranteRepository,
    private readonly clienteRepository: ClienteRepository
  ) {}

  async execute(solicitarReservaDto: SolicitarReservaDto): Promise<ReservaEntity> {
    const restaurante = await new ObtenerRestaurantePorId(this.restauranteRepository).execute(
      solicitarReservaDto.restaurante_id
    )
    const cliente = await new ObtenerClientePorId(this.clienteRepository).execute(
      solicitarReservaDto.cliente_id
    )

    if (cliente.getUsuarioId().toString() != solicitarReservaDto.usuario_id_token?.toString())
      throw CustomErrors.badRequest(
        'El usuario no se encuentra habilitado para hacer reservas de otros usuarios'
      )

    const reserva = await this.reservaRepository.registrarReserva(solicitarReservaDto)
    return reserva
  }
}
