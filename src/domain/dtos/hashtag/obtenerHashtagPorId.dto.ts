import { CustomErrors } from '../../errors'

export class ObtenerHashtagPorIdDto {
  private constructor(public readonly hashtag_id: string) {}
  static crear(objecto: { [key: string]: any }): ObtenerHashtagPorIdDto {
    const { hashtag_id } = objecto
    if (!hashtag_id) throw CustomErrors.badRequest('El id de la Hashtag es requerido')
    return new ObtenerHashtagPorIdDto(hashtag_id)
  }
}
