import {
  ActualizarReservaDto,
  ObtenerReservaPorIdDto,
  ReservaDatasource,
  ReservaEntity,
  ReservaRepository,
  SolicitarReservaDto
} from '../../domain'

export class ReservaRepositoryImpl implements ReservaRepository {
  constructor(private readonly reservaDatasource: ReservaDatasource) {}
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