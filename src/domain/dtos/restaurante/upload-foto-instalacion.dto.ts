import { CustomErrors } from '../../errors'

export class UploadFotoIntalacionDto {
  private constructor(
    public readonly url_foto_instalacion: string,
    public readonly restaurante_id: string
  ) {}

  static crear(object: { [key: string]: any }): UploadFotoIntalacionDto {
    const { url_foto_instalacion, restaurante_id } = object
    if (!url_foto_instalacion)
      throw CustomErrors.badRequest('El campo "url_foto_instalacion"  es requerido')
    if (!restaurante_id) throw CustomErrors.badRequest('El campo "restaurante_id"  es requerido')

    return new UploadFotoIntalacionDto(url_foto_instalacion, restaurante_id)
  }
}
