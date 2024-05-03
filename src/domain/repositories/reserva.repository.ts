import { ActualizarReservaDto } from '../dtos'
import { SolicitarReservaDto } from '../dtos/reserva/solicitar-reserva.dto'
import { ReservaEntity } from '../entities'

export abstract class ReservaRepository {
  abstract registrarReserva(solicitarReservaDto: SolicitarReservaDto): Promise<ReservaEntity>
  abstract actualizarReserva(actualizarReservaDto: ActualizarReservaDto): Promise<ReservaEntity>
}
