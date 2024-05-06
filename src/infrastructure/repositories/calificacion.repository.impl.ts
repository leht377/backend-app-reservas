import {
  CalificacionDatasource,
  CalificacionEntity,
  CalificacionRepository,
  OptiosActualizarCalificacion,
  OptiosRegistrarCalificacion
} from '../../domain'
import {
  ActualizarCalificacionDto,
  CrearCalificacionDto,
  ObtenerCalificaionPorFiltroDto
} from '../../domain/dtos/calificacion'

export class CalificacionRepositoryImpl implements CalificacionRepository {
  constructor(private readonly calificacionDatasource: CalificacionDatasource) {}
  crear(
    crearCalificacionDto: CrearCalificacionDto,
    options?: OptiosRegistrarCalificacion
  ): Promise<CalificacionEntity> {
    return this.calificacionDatasource.crear(crearCalificacionDto, options)
  }
  actualizar(
    actualizarCalificacionDto: ActualizarCalificacionDto,
    options?: OptiosActualizarCalificacion
  ): Promise<CalificacionEntity> {
    return this.calificacionDatasource.actualizar(actualizarCalificacionDto, options)
  }
  obtenerCalificacionPorFiltro(
    obtenerCalificaionPorFiltroDto: ObtenerCalificaionPorFiltroDto
  ): Promise<CalificacionEntity | null> {
    return this.calificacionDatasource.obtenerCalificacionPorFiltro(obtenerCalificaionPorFiltroDto)
  }
}
