import { CalificacionEntity, CustomErrors, ObjectoGenerico } from '../../domain'

export class CalificacionMapper {
  static CalificacionEntityFromObject(object: ObjectoGenerico): CalificacionEntity {
    const { _id, id, cliente_id, restaurante_id, calificacion } = object

    const calificacion_id = _id || id
    if (!calificacion_id) throw CustomErrors.internalServer('Campo id perdido')
    if (!cliente_id) throw CustomErrors.internalServer('Campo cliente_id perdido')
    if (!restaurante_id) throw CustomErrors.internalServer('Campo restaurante_id perdido')
    if (!calificacion) throw CustomErrors.internalServer('Campo calificacion perdido')

    return new CalificacionEntity(calificacion_id, calificacion, cliente_id, restaurante_id)
  }
}
