import { CustomErrors } from '../../errors'

export class EditarHashtagDto {
  private constructor(public readonly nombre: string) {}
  static crear(objecto: { [key: string]: any }): EditarHashtagDto {
    const { nombre } = objecto
    if (nombre && typeof nombre != 'string')
      throw CustomErrors.badRequest('El nombre debe ser un texto')
    return new EditarHashtagDto(nombre)
  }
}
