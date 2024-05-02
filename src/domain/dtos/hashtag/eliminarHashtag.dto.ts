import { CustomErrors } from '../../errors'

export class EliminarHashtagDto {
  private constructor(public readonly hashtag_id: string) {}
  static crear(objecto: { [key: string]: any }): EliminarHashtagDto {
    const { hashtag_id } = objecto
    if (!hashtag_id) throw CustomErrors.badRequest('El id de la Hashtag es requerido')
    return new EliminarHashtagDto(hashtag_id)
  }
}
