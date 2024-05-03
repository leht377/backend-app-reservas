import { PlatoEntity } from '../../entities'
import { CustomErrors } from '../../errors'

export class RegistrarPlatoDto {
  private constructor(
    public readonly categorias_ids: string[],
    public readonly hashtags_ids: string[],
    public readonly nombre: string,
    public readonly descripcion: string,
    public readonly url_foto_principal: string,
    public readonly url_fotos_secundarias: string[],
    public readonly restaurante_id: string,
    public readonly menu_id: string
  ) {}
  static crear(objecto: { [key: string]: any }): RegistrarPlatoDto {
    const {
      nombre,
      hashtags_ids,
      categorias_ids,
      descripcion,
      url_foto_principal,
      url_fotos_secundarias,
      restaurante_id,
      menu_id
    } = objecto

    if (!nombre || typeof nombre !== 'string') {
      throw CustomErrors.badRequest('El campo "nombre" es requerido y debe ser una cadena de texto')
    }
    if (!menu_id || typeof menu_id !== 'string') {
      throw CustomErrors.badRequest(
        'El campo "menu_id" es requerido y debe ser una cadena de texto'
      )
    }
    if (!restaurante_id || typeof restaurante_id !== 'string') {
      throw CustomErrors.badRequest(
        'El campo "restaurante_id" es requerido y debe ser una cadena de texto'
      )
    }
    if (!hashtags_ids || !Array.isArray(hashtags_ids)) {
      throw CustomErrors.badRequest('El campo "hashtags_ids" es requerido y debe ser un array')
    }
    if (!categorias_ids || !Array.isArray(categorias_ids) || categorias_ids?.length < 1) {
      throw CustomErrors.badRequest(
        'El campo "categorias_ids" es requerido y debe contener al menos un elemento ser un array '
      )
    }
    if (!descripcion || typeof descripcion !== 'string') {
      throw CustomErrors.badRequest(
        'El campo "descripcion" es requerido y debe ser una cadena de texto'
      )
    }
    if (!url_foto_principal || typeof url_foto_principal !== 'string') {
      throw CustomErrors.badRequest(
        'El campo "url_foto_principal" es requerido y debe ser una cadena de texto'
      )
    }
    if (!url_fotos_secundarias || !Array.isArray(url_fotos_secundarias)) {
      throw CustomErrors.badRequest(
        'El campo "url_fotos_secundarias" debe ser un array si está presente'
      )
    }

    return new RegistrarPlatoDto(
      categorias_ids,
      hashtags_ids,
      nombre,
      descripcion,
      url_foto_principal,
      url_fotos_secundarias || [],
      restaurante_id,
      menu_id
    )
  }
}
