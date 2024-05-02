import { CustomErrors } from '../../errors'

export class CrearCategoriaDto {
  private constructor(public readonly nombre: string) {}
  static crear(objecto: { [key: string]: any }): CrearCategoriaDto {
    const { nombre } = objecto

    if (!nombre) throw CustomErrors.badRequest('El nombre de la categoría es requerido')
    return new CrearCategoriaDto(nombre?.toLowerCase())
  }
}
