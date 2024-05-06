import { CalificacionDatasource, CalificacionEntity, CalificacionRepository } from '../../domain'
import { ObtenerCalificaionPorFiltroDto } from '../../domain/dtos/calificacion'

export class CalificacionRepositoryImpl implements CalificacionRepository {
  constructor(private readonly calificacionDatasource: CalificacionDatasource) {}
  obtenerCalificacionPorFiltro(
    obtenerCalificaionPorFiltroDto: ObtenerCalificaionPorFiltroDto
  ): Promise<CalificacionEntity | null> {
    return this.calificacionDatasource.obtenerCalificacionPorFiltro(obtenerCalificaionPorFiltroDto)
  }
}
