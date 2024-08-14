import { EstadoReserva } from '../../../common/utils'
import { CustomErrors } from '../../errors'
import { ObjectoGenerico } from '../../types'

export class ObtnerReservaRestauranteDto {
  private constructor(public readonly restaurante_id: string, public readonly query: any) {}

  static crear(object: ObjectoGenerico): ObtnerReservaRestauranteDto {
    const { restaurante_id, query } = object
    const { estado } = query
    if (!restaurante_id) throw CustomErrors.badRequest('El campo "restaurante_id" es requerido')
    if (estado && !Object.values(EstadoReserva).includes(estado))
      throw CustomErrors.badRequest(`El valor "${estado}", no es un estado valido`)
    return new ObtnerReservaRestauranteDto(restaurante_id, query)
  }
}
