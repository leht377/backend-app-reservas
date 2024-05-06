import { CustomErrors } from '../../errors'
import { ObjectoGenerico } from '../../types'

export class ObtenerCalificaionPorFiltroDto {
  private constructor(public readonly restaurante_id: string, public readonly cliente_id: string) {}
  crear(objecto: ObjectoGenerico): ObtenerCalificaionPorFiltroDto {
    const { restaurante_id, cliente_id } = objecto
    if (!restaurante_id) throw CustomErrors.badRequest("El campo 'restaurante_id' es requerido")
    if (!cliente_id) throw CustomErrors.badRequest("El campo 'cliente_id' es requerido")
    return new ObtenerCalificaionPorFiltroDto(restaurante_id, cliente_id)
  }
}
