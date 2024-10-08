import {
  ActualizarReservaDto,
  ObtenerReservaPorIdDto,
  ObtenerRestauranteDto,
  ObtnerReservaDto,
  ObtnerReservaRestauranteDto,
  ReservaDatasource,
  ReservaDetalladoEntity,
  ReservaEntity,
  ReservaRepository,
  SolicitarReservaDto
} from '../../domain'

export class ReservaRepositoryImpl implements ReservaRepository {
  constructor(private readonly reservaDatasource: ReservaDatasource) {}
  obtenerReservasPorRestauranteId(
    obtenerReservasDto: ObtnerReservaRestauranteDto
  ): Promise<ReservaDetalladoEntity[]> {
    return this.reservaDatasource.obtenerReservasPorRestauranteId(obtenerReservasDto)
  }
  obtenerReservasPorClienteId(
    obtenerReservasDto: ObtnerReservaDto
  ): Promise<ReservaDetalladoEntity[]> {
    return this.reservaDatasource.obtenerReservasPorClienteId(obtenerReservasDto)
  }
  obtenerReservaPorId(
    obtenerReservaPorIdDto: ObtenerReservaPorIdDto
  ): Promise<ReservaEntity | null> {
    return this.reservaDatasource.obtenerReservaPorId(obtenerReservaPorIdDto)
  }
  actualizarReserva(actualizarReservaDto: ActualizarReservaDto): Promise<ReservaEntity> {
    return this.reservaDatasource.actualizarReserva(actualizarReservaDto)
  }
  registrarReserva(solicitarReservaDto: SolicitarReservaDto): Promise<ReservaEntity> {
    return this.reservaDatasource.registrarReserva(solicitarReservaDto)
  }
}
