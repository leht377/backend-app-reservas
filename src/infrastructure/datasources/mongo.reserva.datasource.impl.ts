import mongoose, { Mongoose, UpdateQuery, isValidObjectId } from 'mongoose'
import {
  ActualizarReservaDto,
  CustomErrors,
  ObtenerReservaPorIdDto,
  ObtenerRestauranteDto,
  ObtnerReservaDto,
  ObtnerReservaRestauranteDto,
  ReservaDatasource,
  ReservaDetalladoEntity,
  ReservaEntity,
  SolicitarReservaDto
} from '../../domain'
import { ReservaDocument, ReservaModel } from '../../data'
import { ReservaMapper } from '../mappers'
import generateCode from '../../common/utils/generarCode'

export class MongoReservaDatasourceImpl implements ReservaDatasource {
  async obtenerReservasPorRestauranteId(
    obtenerReservasDto: ObtnerReservaRestauranteDto
  ): Promise<ReservaDetalladoEntity[]> {
    try {
      const {
        restaurante_id,
        query: { estado }
      } = obtenerReservasDto
      let queryReserva: mongoose.FilterQuery<ReservaDocument> = { restaurante_id: restaurante_id }
      if (estado) queryReserva = { restaurante_id, estado }

      const reservas = await ReservaModel.find(queryReserva).populate([
        'cliente_id',
        'restaurante_id'
      ])
      return reservas?.map((reserva) =>
        ReservaMapper.ReservaDetalladoEntityFromObject(reserva?.toObject())
      )
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
  async obtenerReservasPorClienteId(
    obtenerReservasDto: ObtnerReservaDto
  ): Promise<ReservaDetalladoEntity[]> {
    try {
      const {
        cliente_id,
        query: { estado }
      } = obtenerReservasDto
      let queryReserva: mongoose.FilterQuery<ReservaDocument> = { cliente_id: cliente_id }
      if (estado) queryReserva = { cliente_id, estado }

      const reservas = await ReservaModel.find(queryReserva).populate([
        'cliente_id',
        'restaurante_id'
      ])
      return reservas?.map((reserva) =>
        ReservaMapper.ReservaDetalladoEntityFromObject(reserva?.toObject())
      )
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
  async obtenerReservaPorId(
    obtenerReservaPorIdDto: ObtenerReservaPorIdDto
  ): Promise<ReservaEntity | null> {
    try {
      const { reserva_id } = obtenerReservaPorIdDto
      if (!isValidObjectId(reserva_id))
        throw CustomErrors.badRequest('El reserva_id no es un id valido')
      const reserva = await ReservaModel.findById(reserva_id)
      if (!reserva) return null
      return ReservaMapper.ReservaEntityFromObject(reserva?.toObject())
    } catch (error) {
      throw error
    }
  }
  async actualizarReserva(actualizarReservaDto: ActualizarReservaDto): Promise<ReservaEntity> {
    try {
      const {
        reserva_id,
        cantidad_personas,
        estado_reserva,
        fecha_reserva,
        hora_reserva,
        nombre_reservante,
        codigo_ingreso
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
      // const code = generateCode()
      const reserva = new ReservaModel({
        cliente_id: cliente_id,
        fecha_reserva: fecha_reserva,
        hora_reserva: hora_reserva,
        nombre_reservante: nombre_reservante,
        cantidad_personas: cantidad_personas,
        restaurante_id: restaurante_id,
        cod_ingreso: generateCode()
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
