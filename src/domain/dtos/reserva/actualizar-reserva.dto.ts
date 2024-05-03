import { EstadoReserva } from '../../../common/utils'
import { CustomErrors } from '../../errors'

export class ActualizarReservaDto {
  private constructor(
    public readonly reserva_id?: string,
    public readonly nombre_reservante?: string,
    public readonly cantidad_personas?: number,
    public readonly estado_reserva?: EstadoReserva,
    public readonly fecha_reserva?: Date,
    public readonly hora_reserva?: Date,
    public readonly codigo_ingreso?: string
  ) {}

  crear(object: { [key: string]: any }): ActualizarReservaDto {
    const {
      reserva_id,
      nombre_reservante,
      cantidad_personas,
      estado_reserva,
      fecha_reserva,
      hora_reserva,
      codigo_ingreso
    } = object

    let cantidad_personas_number
    let fechaReservaDate
    let horaReservaDate

    if (!reserva_id || typeof reserva_id !== 'string')
      throw CustomErrors.badRequest(
        'El campo "reserva_id" es obligatorio y debe ser una cadena de texto'
      )

    if (nombre_reservante && typeof nombre_reservante !== 'string') {
      throw CustomErrors.badRequest('El campo "nombre_reservante" debe ser una cadena de texto')
    }

    if (cantidad_personas) {
      cantidad_personas_number = parseInt(cantidad_personas)

      if (isNaN(cantidad_personas_number))
        throw CustomErrors.badRequest('El campo "cantidad_personas" debe ser un numero entero ')
    }

    if (estado_reserva && !Object.values(EstadoReserva).includes(estado_reserva)) {
      throw CustomErrors.badRequest('El campo "estado_reserva" debe ser del tipo EstadoReserva')
    }

    if (fecha_reserva) {
      fechaReservaDate = new Date(fecha_reserva)
      if (isNaN(fechaReservaDate.getTime())) {
        throw CustomErrors.badRequest('El campo "fecha_reserva" debe ser del tipo Date')
      }
    }

    if (hora_reserva) {
      horaReservaDate = new Date(hora_reserva)
      if (isNaN(horaReservaDate.getTime())) {
        throw CustomErrors.badRequest('El campo "hora_reserva" debe ser del tipo Date')
      }
    }

    return new ActualizarReservaDto(
      reserva_id,
      nombre_reservante,
      cantidad_personas_number,
      estado_reserva,
      fechaReservaDate,
      horaReservaDate,
      codigo_ingreso
    )
  }
}
