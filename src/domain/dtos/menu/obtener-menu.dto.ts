import { CustomErrors } from '../../errors'

export class ObtenerMenuDto {
  private constructor(public readonly menu_id: string) {}

  static crear(objecto: { [key: string]: any }): ObtenerMenuDto {
    const { menu_id } = objecto
    if (!menu_id) throw CustomErrors.badRequest('El menu_id es requerido')

    return new ObtenerMenuDto(menu_id)
  }
}
