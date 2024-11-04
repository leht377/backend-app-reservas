import { CustomErrors } from '../../errors'

export class SolicitarReservaDto {
  private constructor(
    public readonly restaurante_id: string,
    public readonly cliente_id: string,
    public readonly platos_ids: string[],
    public readonly nombre_reservante: string,
    public readonly fecha_reserva: Date,
    public readonly hora_reserva: string,
    public readonly cantidad_personas: number,
    public readonly usuario_id_token: string
  ) {}
  static crear(object: { [key: string]: any }): SolicitarReservaDto {
    let {
      restaurante_id,
      cliente_id,
      nombre_reservante,
      fecha_reserva,
      hora_reserva,
      usuario_id_token,
      cantidad_personas,
      platos_ids
    } = object
    if (!restaurante_id || typeof restaurante_id !== 'string') {
      throw CustomErrors.badRequest(
        'El campo "restaurante_id" es requerido y debe ser una cadena de texto'
      )
    }
    if (!usuario_id_token) throw CustomErrors.badRequest('no se encontro el usuario_id')
    if (!cliente_id || typeof cliente_id !== 'string') {
      throw CustomErrors.badRequest(
        'El campo "cliente_id" es requerido y debe ser una cadena de texto'
      )
    }
    if (!platos_ids) throw CustomErrors.badRequest('Los platos_id son requeridos')
    if (platos_ids && !Array.isArray(platos_ids)) {
      try {
        platos_ids = JSON.parse(platos_ids)
        if (!Array.isArray(platos_ids)) {
          throw CustomErrors.badRequest('Los platos_ids deben ser un array de cadenas de texto')
        }
      } catch (error) {
        throw CustomErrors.badRequest('El formato de categorias_ids no es válido')
      }
    }

    if (!nombre_reservante || typeof nombre_reservante !== 'string') {
      throw CustomErrors.badRequest(
        'El campo "nombre_reservante" es requerido y debe ser una cadena de texto'
      )
    }
    if (!cantidad_personas)
      throw CustomErrors.badRequest('El campo "cantidad_personas" es requerido ')

    let cantidad_personas_number = parseInt(cantidad_personas)
    if (isNaN(cantidad_personas_number))
      throw CustomErrors.badRequest('El campo "cantidad_personas" debe ser un numero entero ')

    const fechaReservaDate = new Date(fecha_reserva)
    if (isNaN(fechaReservaDate.getTime())) {
      throw CustomErrors.badRequest('El campo "fecha_reserva" debe ser una fecha válida')
    }
    console.log(platos_ids)
    // Convertir la cadena de hora en objeto Date
    // const horaReservaDate = new Date(hora_reserva)
    // if (isNaN(horaReservaDate.getTime())) {
    //   throw CustomErrors.badRequest('El campo "hora_reserva" debe ser una fecha válida')
    // }
    if (!hora_reserva) throw CustomErrors.badRequest('El campo "hora_reserva" es requerido ')
    return new SolicitarReservaDto(
      restaurante_id,
      cliente_id,
      platos_ids,
      nombre_reservante,
      fecha_reserva,
      hora_reserva,
      cantidad_personas,
      usuario_id_token
    )
  }
}
