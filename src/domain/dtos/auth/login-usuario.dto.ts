import { validators } from '../../../common/helpers'
import { CustomErrors } from '../../errors'

export class LoginUsuarioDto {
  private constructor(public correo: string, public contrasena: string) {}

  static crear(object: { [key: string]: any }): LoginUsuarioDto {
    const { correo, contrasena } = object
    if (!correo) throw CustomErrors.badRequest('El correo es requerido')
    if (!validators.email.test(correo)) throw CustomErrors.badRequest('correo no valido')
    if (!contrasena) throw CustomErrors.badRequest('La contraseña requrida')

    return new LoginUsuarioDto(correo, contrasena)
  }
}
