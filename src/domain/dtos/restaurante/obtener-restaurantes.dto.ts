import { CustomErrors } from '../../errors'

export class ObtenerRestauranteDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly nombre: string
  ) {}
  static crear(objecto: { [key: string]: any }): ObtenerRestauranteDto {
    let { limit, page, nombre } = objecto

    // Si limit no está definido o es nulo, se asigna el valor predeterminado 10
    limit = limit ? parseInt(limit, 10) : 10
    // Si page no está definido o es nulo, se asigna el valor predeterminado 1
    page = page ? parseInt(page, 10) : 1

    // Se verifica si limit es un número entero válido
    if (isNaN(limit) || !Number.isInteger(limit)) {
      throw CustomErrors.badRequest('El limit debe ser un número entero')
    }

    // Se verifica si page es un número entero válido
    if (isNaN(page) || !Number.isInteger(page)) {
      throw CustomErrors.badRequest('La page debe ser un número entero')
    }

    if (nombre && typeof nombre != 'string')
      throw CustomErrors.badRequest('El nombre debe de ser string')

    return new ObtenerRestauranteDto(page, limit, nombre)
  }
}
