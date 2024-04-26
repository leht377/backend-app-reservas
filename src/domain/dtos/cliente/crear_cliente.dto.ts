import { validators } from '../../../common/helpers'

export class CrearClienteDto {
  private constructor(public nombre: string, public apellido: string, public usuario_id: string) {}

  static crear(object: { [key: string]: any }): [string?, CrearClienteDto?] {
    const { nombre, apellido, usuario_id } = object

    if (!nombre) return ['El nombre del cliente es requerido', undefined]
    if (!apellido) return ['El apellido del cliente es requerido', undefined]
    if (!usuario_id) return ['El usuario_id del cliente es requerido', undefined]

    return [undefined, new CrearClienteDto(nombre, apellido, usuario_id)]
  }
}
