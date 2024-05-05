import { CustomErrors } from '../../errors'

export class ActualizarRestauranteDto {
  private constructor(
    public readonly id: string,
    public readonly usuario_id: string,
    public readonly nombre?: string,
    public readonly descripcion?: string,
    public readonly localizacion?: string,
    public readonly foto_restaurante?: string,
    public readonly horas_servicios?: string[],
    public readonly dias_servicios?: string[],
    public readonly menu_id?: string,
    public readonly filesToUpload?: any
  ) {}

  static crear(objecto: { [key: string]: any }): ActualizarRestauranteDto {
    const {
      id,
      nombre,
      descripcion,
      files,
      localizacion,
      foto_restaurante,
      horas_servicios,
      dias_servicios,
      usuarioToken,
      menu_id,
      usuario_id
    } = objecto
    // const usuario_id = usuarioToken?.id || usuarioToken?._id
    // Validar tipos de datos

    if (!id) throw CustomErrors.badRequest('El id del restaurante es requerido')
    if (!usuario_id) throw CustomErrors.badRequest('El id usuario es requerido')
    if (nombre && typeof nombre !== 'string')
      throw CustomErrors.badRequest('El nombre debe ser una cadena de texto')
    if (menu_id && typeof menu_id?.toString() !== 'string')
      throw CustomErrors.badRequest('El menu_id debe ser una cadena de texto')
    if (descripcion && typeof descripcion !== 'string')
      throw CustomErrors.badRequest('La descripción debe ser una cadena de texto')
    if (localizacion && typeof localizacion !== 'string')
      throw CustomErrors.badRequest('La localización debe ser una cadena de texto')
    if (foto_restaurante && typeof foto_restaurante !== 'string')
      throw CustomErrors.badRequest('La foto del restaurante debe ser una cadena de texto')
    if (horas_servicios && !Array.isArray(horas_servicios))
      throw CustomErrors.badRequest('Las horas de servicio deben ser un array de cadenas de texto')
    if (dias_servicios && !Array.isArray(dias_servicios))
      throw CustomErrors.badRequest('Los días de servicio deben ser un array de cadenas de texto')

    return new ActualizarRestauranteDto(
      id,
      usuario_id,
      nombre,
      descripcion,
      localizacion,
      foto_restaurante,
      horas_servicios,
      dias_servicios,
      menu_id,
      files
    )
  }
}
