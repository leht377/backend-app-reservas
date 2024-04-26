import { validators } from '../../../common/helpers'

export class CrearUsuarioDto {
  private constructor(public correo: string, public contrasena: string, public rol: string) {}

  static crear(object: { [key: string]: any }): [string?, CrearUsuarioDto?] {
    const { correo, contrasena, rol } = object

    if (!correo) return ['El correo del usuario es requerido', undefined]
    if (!validators.email.test(correo)) return ['El correo no es valido', undefined]
    if (!contrasena) return ['la contrasena del usuario es requerida', undefined]
    if (!rol) return ['el rol del usuario es requerido', undefined]

    return [undefined, new CrearUsuarioDto(correo, contrasena, rol)]
  }
}
