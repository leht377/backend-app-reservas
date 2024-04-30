import { CustomErrors } from '../../errors'

export class RegistrarRestauranteDto {
  private constructor(
    public readonly nombre: string,
    public readonly locacion: string,
    public readonly usuario_id: string
  ) {}

  static crear(object: { [key: string]: any }): RegistrarRestauranteDto {
    const { nombre, locacion, usuario_id } = object
    if (!nombre) throw CustomErrors.badRequest('El nombre del restaurante es requerido')
    if (!locacion) throw CustomErrors.badRequest('La localización del restaurante es requerida')
    if (!usuario_id) throw CustomErrors.badRequest("El id del usuario 'usuario_id' es requerido")
    return new RegistrarRestauranteDto(nombre, locacion, usuario_id)
  }
}
