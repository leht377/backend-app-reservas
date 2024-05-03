import {
  ActualizarReservaDto,
  ReservaDatasource,
  ReservaEntity,
  ReservaRepository,
  SolicitarReservaDto
} from '../../domain'

export class ReservaRepositoryImpl implements ReservaRepository {
  constructor(private readonly reservaDatasource: ReservaDatasource) {}
  actualizarReserva(actualizarReservaDto: ActualizarReservaDto): Promise<ReservaEntity> {
    return this.reservaDatasource.actualizarReserva(actualizarReservaDto)
  }
  registrarReserva(solicitarReservaDto: SolicitarReservaDto): Promise<ReservaEntity> {
    return this.reservaDatasource.registrarReserva(solicitarReservaDto)
  }
}
