import { CustomErrors, ReservaEntity } from '../../domain'

export class ReservaMapper {
  static ReservaEntityFromObject(object: { [key: string]: any }): ReservaEntity {
    const {
      _id,
      id,
      restaurante_id,
      cliente_id,
      nombre_reservante,
      cantidad_personas,
      estado,
      fecha_reserva,
      cod_ingreso,
      hora_reserva
    } = object

    const reserva_id = _id || id

    if (!reserva_id) throw CustomErrors.internalServer('id de la reserva perdido')
    if (!restaurante_id) throw CustomErrors.internalServer('restaurante_id de la reserva perdido')
    if (!cliente_id) throw CustomErrors.internalServer('cliente_id de la reserva perdido')
    if (!nombre_reservante)
      throw CustomErrors.internalServer('nombre_reservante de la reserva perdido')
    if (!estado) throw CustomErrors.internalServer('estado de la reserva perdido')
    if (!fecha_reserva) throw CustomErrors.internalServer('fecha_reserva de la reserva perdido')
    if (!cantidad_personas)
      throw CustomErrors.internalServer('cantidad_personas de la reserva perdido')
    if (!hora_reserva) throw CustomErrors.internalServer('hora_reserva de la reserva perdido')
    return new ReservaEntity(
      reserva_id,
      cliente_id,
      restaurante_id,
      nombre_reservante,
      cantidad_personas,
      estado,
      fecha_reserva,
      hora_reserva,
      cod_ingreso
    )
  }
}
