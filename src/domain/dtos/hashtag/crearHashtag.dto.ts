import { CustomErrors } from '../../errors'

export class RegistrarHashtagDto {
  private constructor(public readonly nombre: string) {}
  static crear(objecto: { [key: string]: any }): RegistrarHashtagDto {
    const { nombre } = objecto

    if (!nombre) throw CustomErrors.badRequest('El nombre de la hashtag es requerido')
    return new RegistrarHashtagDto(nombre?.toLowerCase())
  }
}
