import {
  ActualizarCalificacionDto,
  CrearCalificacionDto,
  ObtenerCalificaionPorFiltroDto
} from '../dtos/calificacion'
import { CalificacionEntity } from '../entities'
import { OptiosActualizarCalificacion, OptiosRegistrarCalificacion } from '../interfaces'

export abstract class CalificacionRepository {
  abstract obtenerCalificacionPorFiltro(
    obtenerCalificaionPorFiltroDto: ObtenerCalificaionPorFiltroDto
  ): Promise<CalificacionEntity | null>

  abstract crear(
    crearCalificacionDto: CrearCalificacionDto,
    options?: OptiosRegistrarCalificacion
  ): Promise<CalificacionEntity>
  abstract actualizar(
    actualizarCalificacionDto: ActualizarCalificacionDto,
    options?: OptiosActualizarCalificacion
  ): Promise<CalificacionEntity>
}
