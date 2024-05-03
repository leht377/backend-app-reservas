import mongoose, { ClientSession } from 'mongoose'
import { CustomErrors, OptiosRegistrarPlato, PlatoDatasorce, PlatoEntity } from '../../domain'
import { RegistrarPlatoDto } from '../../domain/dtos/plato'
import { PlatoModel } from '../../data'
import { PlatoMapper } from '../mappers'

export class MongoPlatoDatasourceImpl implements PlatoDatasorce {
  async registrar(
    registrarPlatoDto: RegistrarPlatoDto,
    options?: OptiosRegistrarPlato
  ): Promise<PlatoEntity> {
    try {
      let session: ClientSession | undefined
      session = options?.session
      const {
        categorias_ids,
        descripcion,
        hashtags_ids,
        menu_id,
        nombre,
        restaurante_id,
        url_foto_principal,
        url_fotos_secundarias
      } = registrarPlatoDto

      const plato = new PlatoModel({
        nombre: nombre,
        descripcion: descripcion,
        categoria_id: categorias_ids,
        url_foto_principal: url_foto_principal,
        url_fotos_secundarias: url_fotos_secundarias,
        hashtag_id: hashtags_ids
      })
      const platoGuardado = await plato.save({ session })
      const platoPopulate = await platoGuardado.populate(['categoria_id', 'hashtag_id'])

      const platoEntity = PlatoMapper.PlatoEntityFromObject(platoPopulate.toObject())
      return platoEntity
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
}
