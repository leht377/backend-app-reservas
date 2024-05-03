import { CustomErrors } from '../../errors'

export class AgregarPlatoDto {
  private constructor(public readonly plato_id: string, public readonly menu_id: string) {}

  static crear(objecto: { [key: string]: any }): AgregarPlatoDto {
    const { plato_id, menu_id } = objecto
    if (!menu_id) throw CustomErrors.badRequest('El menu_id es requerido')
    if (!plato_id) throw CustomErrors.badRequest('El plato_id es requerido')
    return new AgregarPlatoDto(plato_id, menu_id)
  }
}
