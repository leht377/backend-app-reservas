import {
  ActualizarReservaDto,
  ObtenerReservaPorIdDto,
  ObtenerRestauranteDto,
  ObtnerReservaDto
} from '../dtos'
import { SolicitarReservaDto } from '../dtos/reserva/solicitar-reserva.dto'
import { ReservaDetalladoEntity, ReservaEntity } from '../entities'

export abstract class ReservaDatasource {
  abstract registrarReserva(solicitarReservaDto: SolicitarReservaDto): Promise<ReservaEntity>
  abstract actualizarReserva(actualizarReservaDto: ActualizarReservaDto): Promise<ReservaEntity>
  abstract obtenerReservaPorId(
    obtenerReservaPorIdDto: ObtenerReservaPorIdDto
  ): Promise<ReservaEntity | null>
  abstract obtenerReservasPorClienteId(
    obtenerReservasDto: ObtnerReservaDto
  ): Promise<ReservaDetalladoEntity[]>
}
