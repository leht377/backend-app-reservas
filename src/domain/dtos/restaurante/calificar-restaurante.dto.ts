import { CustomErrors } from '../../errors'
import { ObjectoGenerico } from '../../types'

export class CalificarRestuaranteDto {
  private constructor(
    public readonly calificacion: number,
    public readonly cliente_id: string,
    public readonly restaurante_id: string,
    public readonly usuario_id: string
  ) {}
  static crear(objecto: ObjectoGenerico): CalificarRestuaranteDto {
    const { calificacion, cliente_id, restaurante_id, usuario_id } = objecto
    if (!calificacion || typeof calificacion != 'number')
      throw CustomErrors.badRequest('El campo calificacion es requerido y debe ser un entero')
    if (calificacion < 0 || calificacion > 5)
      throw CustomErrors.badRequest('La califcacion debe no debe de ser menor que 0 ni mayor que 5')
    if (!cliente_id)
      throw CustomErrors.badRequest('El campo cliente_id es requerido y debe ser un texto')
    if (!restaurante_id)
      throw CustomErrors.badRequest('El campo restaurante_id es requerido y debe ser un texto')
    if (!usuario_id)
      throw CustomErrors.badRequest('El campo usuario_id es requerido y debe ser un texto')
    return new CalificarRestuaranteDto(calificacion, cliente_id, restaurante_id, usuario_id)
  }
}
