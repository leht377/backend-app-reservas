import { CategoriaEntity, CustomErrors, HashtagEntity } from '../../domain'

export class HashtagMapper {
  static HashtagEntityFromObject(object: { [key: string]: any }): HashtagEntity {
    const { nombre, id, _id } = object

    const hashtag_id = id || _id

    if (!nombre) throw CustomErrors.internalServer('Nombre de la hashtag perdido')
    if (!hashtag_id) throw CustomErrors.internalServer('id de la hashtag perdida')

    return new HashtagEntity(hashtag_id, nombre)
  }
}
