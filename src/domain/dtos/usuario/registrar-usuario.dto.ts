import { validators } from '../../../common/helpers'
import { UsuarioRol } from '../../../common/utils'
import { CustomErrors } from '../../errors'

export class RegistrarUsuarioDto {
  private constructor(
    public readonly correo: string,
    public readonly contrasena: string,
    public readonly rol: string
  ) {}

  static crear(object: { [key: string]: any }): RegistrarUsuarioDto {
    const { correo, contrasena, rol } = object

    if (!correo) throw CustomErrors.badRequest('El correo es requerido')
    if (!validators.email.test(correo)) throw CustomErrors.badRequest('Correo no valido')
    if (!contrasena) throw CustomErrors.badRequest('La contraseña es requerida')
    if (contrasena?.length < 5) throw CustomErrors.badRequest('La contraseña es demasiado corta')
    if (!rol) throw CustomErrors.badRequest('La contraseña es demasiado corta')
    if (rol != UsuarioRol.CLIENTE && rol != UsuarioRol.RESTAURANTE)
      throw CustomErrors.badRequest(`El rol ${rol} no es valido`)
    return new RegistrarUsuarioDto(correo, contrasena, rol)
  }
}
