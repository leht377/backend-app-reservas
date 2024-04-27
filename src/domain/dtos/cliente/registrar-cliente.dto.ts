import { validators } from '../../../common/helpers'
import { CustomErrors } from '../../errors'

export class RegistrarClienteDto {
  private constructor(
    public readonly nombre: string,
    public readonly apellido: string,
    public readonly usuario_id: string
  ) {}

  static crear(object: { [key: string]: any }): RegistrarClienteDto {
    const { nombre, apellido, usuario_id } = object

    if (!nombre) throw CustomErrors.badRequest('El nombre es requerido')
    if (!apellido) throw CustomErrors.badRequest('El apellido es requerido')
    if (!usuario_id) throw CustomErrors.badRequest('El usuario_id es requerido')

    return new RegistrarClienteDto(nombre, apellido, usuario_id)
  }
}
