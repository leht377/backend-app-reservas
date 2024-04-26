import { validators } from '../../../common/helpers'

export class CrearClienteUsuarioDto {
  private constructor(
    public nombre: string,
    public apellido: string,
    public correo: string,
    public contrasena: string
  ) {}

  static crear(object: { [key: string]: any }): [string?, CrearClienteUsuarioDto?] {
    const { nombre, apellido, correo, contrasena } = object

    if (!nombre) return ['El nombre del cliente es requerido', undefined]
    if (!apellido) return ['El apellido del cliente es requerido', undefined]
    if (!correo) return ['El correo del cliente es requerido', undefined]
    if (!validators.email.test(correo)) return ['El correo no es valido', undefined]
    if (!contrasena) return ['la contrasena del cliente es requerida', undefined]

    return [undefined, new CrearClienteUsuarioDto(nombre, apellido, correo, contrasena)]
  }
}
