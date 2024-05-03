import mongoose, { UpdateQuery, isValidObjectId } from 'mongoose'
import {
  ActualizarReservaDto,
  CustomErrors,
  ReservaDatasource,
  ReservaEntity,
  SolicitarReservaDto
} from '../../domain'
import { ReservaDocument, ReservaModel } from '../../data'
import { ReservaMapper } from '../mappers'

export class MongoReservaDatasourceImpl implements ReservaDatasource {
  async actualizarReserva(actualizarReservaDto: ActualizarReservaDto): Promise<ReservaEntity> {
    try {
      const {
        reserva_id,
        cantidad_personas,
        estado_reserva,
        fecha_reserva,
        hora_reserva,
        nombre_reservante
      } = actualizarReservaDto

      if (!isValidObjectId(reserva_id))
        throw CustomErrors.badRequest('El id de la reserva no es un id valido')

      const data: UpdateQuery<ReservaDocument> = {
        cantidad_personas: cantidad_personas,
        estado: estado_reserva,
        fecha_reserva: fecha_reserva,
        hora_reserva: hora_reserva,
        nombre_reservante: nombre_reservante
      }

      const reservaActualizada = await ReservaModel.findByIdAndUpdate(reserva_id, data, {
        runValidators: true,
        new: true
      })

      if (!reservaActualizada)
        throw CustomErrors.badRequest(`No existe ninguna reserva asociado al id :${reserva_id}`)

      return ReservaMapper.ReservaEntityFromObject(reservaActualizada?.toObject())
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
  async registrarReserva(solicitarReservaDto: SolicitarReservaDto): Promise<ReservaEntity> {
    try {
      const {
        cantidad_personas,
        cliente_id,
        fecha_reserva,
        hora_reserva,
        nombre_reservante,
        restaurante_id
      } = solicitarReservaDto

      if (!isValidObjectId(cliente_id))
        throw CustomErrors.badRequest('El cliente_id no es un id valido')
      if (!isValidObjectId(restaurante_id))
        throw CustomErrors.badRequest('El restaurante_id no es un id valido')

      const reserva = new ReservaModel({
        cliente_id: cliente_id,
        fecha_reserva: fecha_reserva,
        hora_reserva: hora_reserva,
        nombre_reservante: nombre_reservante,
        cantidad_personas: cantidad_personas,
        restaurante_id: restaurante_id
      })
      const reservaGuardada = await reserva.save()
      return ReservaMapper.ReservaEntityFromObject(reservaGuardada?.toObject())
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
}
