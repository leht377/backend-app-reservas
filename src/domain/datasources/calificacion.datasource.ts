import { ObtenerCalificaionPorFiltroDto } from '../dtos/calificacion'
import { CalificacionEntity } from '../entities'

export abstract class CalificacionDatasource {
  abstract obtenerCalificacionPorFiltro(
    obtenerCalificaionPorFiltroDto: ObtenerCalificaionPorFiltroDto
  ): Promise<CalificacionEntity | null>
}
