import { CustomErrors } from '../../errors'
import { ObjectoGenerico } from '../../types'

export class CrearCalificacionDto {
  private constructor(
    public readonly calificacion: number,
    public readonly cliente_id: string,
    public readonly restaurante_id: string
  ) {}
  static crear(objecto: ObjectoGenerico): CrearCalificacionDto {
    const { calificacion, cliente_id, restaurante_id } = objecto
    if (!calificacion || typeof calificacion != 'number')
      throw CustomErrors.badRequest('El campo calificacion es requerido y debe ser un entero')
    if (!cliente_id)
      throw CustomErrors.badRequest('El campo cliente_id es requerido y debe ser un texto')
    if (!restaurante_id)
      throw CustomErrors.badRequest('El campo restaurante_id es requerido y debe ser un texto')
    return new CrearCalificacionDto(calificacion, cliente_id, restaurante_id)
  }
}
