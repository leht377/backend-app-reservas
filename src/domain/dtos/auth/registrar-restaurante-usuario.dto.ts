import { validators } from '../../../common/helpers'
import { CustomErrors } from '../../errors'

export class RegistrarRestauranteUsuarioDto {
  private constructor(
    public readonly nombre: string,
    public readonly locacion: string,
    public readonly correo: string,
    public readonly contrasena: string
  ) {}

  static crear(object: { [key: string]: any }): RegistrarRestauranteUsuarioDto {
    const { nombre, locacion, correo, contrasena } = object
    if (!nombre) throw CustomErrors.badRequest('El nombre del restaurante es requerido')
    if (!locacion) throw CustomErrors.badRequest('La localización del restaurante es requerida')
    if (!correo) throw CustomErrors.badRequest('El correo del restaurante es requerida')
    if (!validators.email.test(correo))
      throw CustomErrors.badRequest(`El correo ${correo} es invalido`)
    if (!contrasena) throw CustomErrors.badRequest('La contraseña es requerida')

    return new RegistrarRestauranteUsuarioDto(nombre, locacion, correo, contrasena)
  }
}
