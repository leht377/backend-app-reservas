import { CustomErrors } from '../../errors'

export class RegistrarMenuDto {
  private constructor(public readonly restaurante_id: string) {}

  crear(objecto: { [key: string]: any }): RegistrarMenuDto {
    const { restaurante_id } = objecto
    if (!restaurante_id) throw CustomErrors.badRequest('El id del restaurante es requerido')
    return new RegistrarMenuDto(restaurante_id)
  }
}
