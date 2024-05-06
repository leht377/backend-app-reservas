import { CalificacionModel } from '../../data'
import { CalificacionDatasource, CalificacionEntity } from '../../domain'
import { ObtenerCalificaionPorFiltroDto } from '../../domain/dtos/calificacion'
import { CalificacionMapper } from '../mappers'

export class MongoCalificacionDatasourceImpl implements CalificacionDatasource {
  async obtenerCalificacionPorFiltro(
    obtenerCalificaionPorFiltroDto: ObtenerCalificaionPorFiltroDto
  ): Promise<CalificacionEntity | null> {
    const { cliente_id, restaurante_id } = obtenerCalificaionPorFiltroDto

    const calificacion = await CalificacionModel.findOne({
      cliente_id: cliente_id,
      restaurante_id: restaurante_id
    })

    if (!calificacion) return null
    return CalificacionMapper.CalificacionEntityFromObject(calificacion?.toObject())
  }
}
