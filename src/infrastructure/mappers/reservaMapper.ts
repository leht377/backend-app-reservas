import { CustomErrors, ReservaDetalladoEntity, ReservaEntity } from '../../domain'
import { PlatoMapper } from './platoMapper'

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
      hora_reserva,
      platos_id
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
    if (!Array.isArray(platos_id))
      throw CustomErrors.internalServer('platos_id de la reserva perdido')
    return new ReservaEntity(
      reserva_id,
      cliente_id,
      platos_id,
      restaurante_id,
      nombre_reservante,
      cantidad_personas,
      estado,
      fecha_reserva,
      hora_reserva,
      cod_ingreso
    )
  }

  static ReservaDetalladoEntityFromObject(object: { [key: string]: any }): ReservaDetalladoEntity {
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
      hora_reserva,
      platos_id
    } = object

    const reserva_id = _id || id

    const clienteId = cliente_id?._id || cliente_id?.id
    const nombreCliente = cliente_id?.nombre
    const apellidoCliente = cliente_id?.apellido

    const restauranteId = restaurante_id?._id || restaurante_id?.id
    const nombreRestaurente = restaurante_id?.nombre
    const locacionRestaurente = restaurante_id?.locacion

    if (!reserva_id) throw CustomErrors.internalServer('id de la reserva perdido')
    if (!restauranteId) throw CustomErrors.internalServer('restaurante_id de la reserva perdido')
    if (!clienteId) throw CustomErrors.internalServer('cliente_id de la reserva perdido')
    if (!nombreCliente) throw CustomErrors.internalServer('nombreCliente de la reserva perdido')
    if (!apellidoCliente) throw CustomErrors.internalServer('apellidoCliente de la reserva perdido')
    if (!nombreRestaurente)
      throw CustomErrors.internalServer('nombreRestaurente de la reserva perdido')
    if (!locacionRestaurente)
      throw CustomErrors.internalServer('locacionRestaurente de la reserva perdido')
    if (!nombre_reservante)
      throw CustomErrors.internalServer('nombre_reservante de la reserva perdido')
    if (!estado) throw CustomErrors.internalServer('estado de la reserva perdido')
    if (!fecha_reserva) throw CustomErrors.internalServer('fecha_reserva de la reserva perdido')
    if (!cantidad_personas)
      throw CustomErrors.internalServer('cantidad_personas de la reserva perdido')
    if (!hora_reserva) throw CustomErrors.internalServer('hora_reserva de la reserva perdido')
    if (!Array.isArray(platos_id))
      throw CustomErrors.internalServer('platos_id de la reserva perdido')
    const plato = platos_id?.map((p) => PlatoMapper.PlatoEntityFromObject(p))

    return new ReservaDetalladoEntity(
      reserva_id,
      clienteId,
      nombreCliente,
      apellidoCliente,
      nombreRestaurente,
      locacionRestaurente,
      restauranteId,
      nombre_reservante,
      cantidad_personas,
      estado,
      plato,
      fecha_reserva,
      hora_reserva,
      cod_ingreso
    )
  }
}
