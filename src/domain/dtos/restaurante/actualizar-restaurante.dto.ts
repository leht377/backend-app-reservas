import { DiasServicioRestaurante, HorasServicioRestaurante } from '../../../common/utils'
import { CustomErrors } from '../../errors'

export class ActualizarRestauranteDto {
  private constructor(
    public readonly id: string,
    public readonly usuario_id: string,
    public readonly nombre?: string,
    public readonly descripcion?: string,
    public readonly localizacion?: string,
    public readonly foto_restaurante?: string,
    public readonly horas_servicios?: string[],
    public readonly dias_servicios?: string[],
    public readonly menu_id?: string,
    public readonly filesToUpload?: any,
    public readonly calificacion?: number,
    public readonly cantidad_resenas?: number,
    public readonly calificacion_promedio?: number
  ) {}

  static crear(objecto: { [key: string]: any }): ActualizarRestauranteDto {
    let {
      id,
      nombre,
      descripcion,
      files,
      localizacion,
      foto_restaurante,
      horas_servicios,
      dias_servicios,
      usuarioToken,
      menu_id,
      calificacion,
      cantidad_resenas,
      usuario_id,
      calificacion_promedio
    } = objecto
    // const usuario_id = usuarioToken?.id || usuarioToken?._id
    // Validar tipos de datos

    if (!id) throw CustomErrors.badRequest('El id del restaurante es requerido')
    if (!usuario_id) throw CustomErrors.badRequest('El id usuario es requerido')
    if (nombre && typeof nombre !== 'string')
      throw CustomErrors.badRequest('El nombre debe ser una cadena de texto')
    if (menu_id && typeof menu_id?.toString() !== 'string')
      throw CustomErrors.badRequest('El menu_id debe ser una cadena de texto')
    if (descripcion && typeof descripcion !== 'string')
      throw CustomErrors.badRequest('La descripción debe ser una cadena de texto')
    if (localizacion && typeof localizacion !== 'string')
      throw CustomErrors.badRequest('La localización debe ser una cadena de texto')
    if (foto_restaurante && typeof foto_restaurante !== 'string')
      throw CustomErrors.badRequest('La foto del restaurante debe ser una cadena de texto')
    if (horas_servicios && !Array.isArray(horas_servicios))
      throw CustomErrors.badRequest('Las horas de servicio deben ser un array de cadenas de texto')
    if (horas_servicios) {
      for (const d of horas_servicios) {
        if (!Object.values(HorasServicioRestaurante).includes(d)) {
          throw CustomErrors.badRequest(`${d} No es una hora valida`)
        }
      }
      horas_servicios = [...new Set(horas_servicios)]
    }
    if (dias_servicios && !Array.isArray(dias_servicios))
      throw CustomErrors.badRequest('Los días de servicio deben ser un array de cadenas de texto')
    if (dias_servicios) {
      for (const d of dias_servicios) {
        if (!Object.values(DiasServicioRestaurante).includes(d)) {
          throw CustomErrors.badRequest(`${d} No es un dia valido`)
        }
      }
      dias_servicios = [...new Set(dias_servicios)]
    }
    if (cantidad_resenas && typeof cantidad_resenas !== 'number')
      throw CustomErrors.badRequest('La cantidad de reseñas debe ser un numero')
    if (calificacion && typeof calificacion !== 'number')
      throw CustomErrors.badRequest('La calificacion debe ser un numero')
    if (calificacion_promedio && typeof calificacion_promedio !== 'number')
      throw CustomErrors.badRequest('La calificacion_promedio debe ser un numero')

    return new ActualizarRestauranteDto(
      id,
      usuario_id,
      nombre,
      descripcion,
      localizacion,
      foto_restaurante,
      horas_servicios,
      dias_servicios,
      menu_id,
      files,
      calificacion,
      cantidad_resenas,
      calificacion_promedio
    )
  }
}
