import { ObtnerReservaDto } from '../../dtos'
import { ReservaEntity } from '../../entities'
import { ClienteRepository, ReservaRepository } from '../../repositories'
import { ObtenerClientePorId } from './obterner-cliente-id.usecase'

export class ObtenerReservasCliente {
  constructor(
    private readonly reservaRepository: ReservaRepository,
    private readonly clienteRepository: ClienteRepository
  ) {}

  async execute(obtenerReservasDto: ObtnerReservaDto): Promise<ReservaEntity[]> {
    const { cliente_id } = obtenerReservasDto
    const cliente = await new ObtenerClientePorId(this.clienteRepository).execute(cliente_id)

    const reservas = await this.reservaRepository.obtenerReservasPorClienteId(obtenerReservasDto)
    return reservas
  }
}
