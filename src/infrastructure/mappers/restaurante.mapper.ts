import { CustomErrors, RestauranteEntity } from '../../domain'

export class RestauranteMapper {
  static RestauranteEntityFromObject(object: { [key: string]: any }): RestauranteEntity {
    const {
      _id,
      id,
      usuario_id,
      menu_id,
      nombre,
      descripcion,
      calificacion,
      cantidad_resenas,
      locacion,
      horas_servicio,
      dias_servicio,
      url_fotos_restaurantes,
      url_fotos_instalacciones,
      fechas_bloqueadas_reservas
    } = object
    const restaurante_id = _id || id

    if (!restaurante_id) throw CustomErrors.internalServer('id del restaurante perdido')
    if (!usuario_id) throw CustomErrors.internalServer('usuario_id del restaurante perdido')
    // if (!menu_id) throw CustomErrors.internalServer('menu_id del restaurante perdido')
    if (!nombre) throw CustomErrors.internalServer('nombre del restaurante perdido')
    if (descripcion != '' && !descripcion)
      throw CustomErrors.internalServer('descripcion del restaurante perdido')
    if (calificacion != 0 && !calificacion)
      throw CustomErrors.internalServer('calificacion del restaurante perdido')
    if (cantidad_resenas != 0 && !cantidad_resenas)
      throw CustomErrors.internalServer('cantidad_resenas del restaurante perdido')
    if (!locacion) throw CustomErrors.internalServer('locacion del restaurante perdido')
    if (!horas_servicio) throw CustomErrors.internalServer('horas_servicio del restaurante perdido')
    if (!dias_servicio) throw CustomErrors.internalServer('dias_servicio del restaurante perdido')
    if (!url_fotos_restaurantes)
      throw CustomErrors.internalServer('url_fotos_restaurantes del restaurante perdido')
    if (!url_fotos_instalacciones)
      throw CustomErrors.internalServer('url_fotos_instalacciones del restaurante perdido')
    if (!fechas_bloqueadas_reservas)
      throw CustomErrors.internalServer('fechas_bloqueadas_reservas del restaurante perdido')

    return new RestauranteEntity(
      restaurante_id,
      usuario_id,
      nombre,
      descripcion,
      calificacion,
      cantidad_resenas,
      locacion,
      horas_servicio,
      dias_servicio,
      url_fotos_restaurantes,
      url_fotos_instalacciones,
      fechas_bloqueadas_reservas,
      menu_id
    )
  }
}
