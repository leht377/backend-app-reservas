import { CustomErrors, PlatoEntity } from '../../domain'
import { CategoriaMapper } from './categoriaMapper'
import { HashtagMapper } from './hashtagMapper'

export class PlatoMapper {
  static PlatoEntityFromObject(object: { [key: string]: any }): PlatoEntity {
    const {
      _id,
      id,
      categoria_id,
      hashtag_id,
      nombre,
      descripcion,
      url_foto_principal,
      url_fotos_secundarias
    } = object

    if (!_id) throw CustomErrors.internalServer('El campo "_id" es requerido')
    if (!categoria_id || !Array.isArray(categoria_id))
      throw CustomErrors.internalServer('El campo "categoria_id" es requerido y debe ser un array')
    if (!hashtag_id || !Array.isArray(hashtag_id))
      throw CustomErrors.internalServer('El campo "hashtag_id" es requerido y debe ser un array')
    if (!nombre || typeof nombre !== 'string')
      throw CustomErrors.internalServer(
        'El campo "nombre" es requerido y debe ser una cadena de texto'
      )
    if (!descripcion || typeof descripcion !== 'string')
      throw CustomErrors.internalServer(
        'El campo "descripcion" es requerido y debe ser una cadena de texto'
      )
    if (!url_foto_principal || typeof url_foto_principal !== 'string')
      throw CustomErrors.internalServer(
        'El campo "url_foto_principal" es requerido y debe ser una cadena de texto'
      )

    const plato_id = _id?.toString() || id?.toString()

    const categorias = categoria_id?.map((categoria) =>
      CategoriaMapper.CategoriaEntityFromObject(categoria)
    )

    const hashtag = hashtag_id?.map((hashtag) => HashtagMapper.HashtagEntityFromObject(hashtag))

    return new PlatoEntity(
      plato_id,
      categorias,
      hashtag,
      nombre,
      descripcion,
      url_foto_principal,
      url_fotos_secundarias || []
    )
  }
}
