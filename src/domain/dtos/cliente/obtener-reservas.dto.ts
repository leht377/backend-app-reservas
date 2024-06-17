import { EstadoReserva } from '../../../common/utils'
import { CustomErrors } from '../../errors'
import { ObjectoGenerico } from '../../types'

export class ObtnerReservaDto {
  private constructor(public readonly cliente_id: string, public readonly query: any) {}

  static crear(object: ObjectoGenerico): ObtnerReservaDto {
    const { cliente_id, query } = object
    const { estado } = query
    if (!cliente_id) throw CustomErrors.badRequest('El campo "cliente_id" es requerido')
    if (estado && !Object.values(EstadoReserva).includes(estado))
      throw CustomErrors.badRequest(`El valor "${estado}", no es un estado valido`)
    return new ObtnerReservaDto(cliente_id, query)
  }
}
