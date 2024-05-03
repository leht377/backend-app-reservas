import {
  ReservaDatasource,
  ReservaEntity,
  ReservaRepository,
  SolicitarReservaDto
} from '../../domain'

export class ReservaRepositoryImpl implements ReservaRepository {
  constructor(private readonly reservaDatasource: ReservaDatasource) {}
  registrarReserva(solicitarReservaDto: SolicitarReservaDto): Promise<ReservaEntity> {
    return this.reservaDatasource.registrarReserva(solicitarReservaDto)
  }
}
