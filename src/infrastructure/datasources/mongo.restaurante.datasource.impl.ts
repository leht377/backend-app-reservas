import mongoose, { ClientSession, isValidObjectId } from 'mongoose'
import {
  CustomErrors,
  OptionsRegistrarRestaurante,
  RestauranteDataSource,
  RestauranteDetalladoEntity,
  RestauranteEntity
} from '../../domain'
import { RegistrarRestauranteDto } from '../../domain/dtos/restaurante/registrar-restaurante.dto'
import { RestauranteDocument, RestuaranteModelo } from '../../data'
import { RestauranteMapper } from '../mappers'

export class MongoRestauranteDataSourceImpl implements RestauranteDataSource {
  async obtenerRestaurantePorUsuarioId(id: string): Promise<RestauranteDetalladoEntity | null> {
    if (!isValidObjectId(id)) throw CustomErrors.badRequest(`El id:${id} no es valido`)

    const restaurante: RestauranteDocument | null = await RestuaranteModelo.findOne({
      usuario_id: id
    }).populate('usuario_id')

    if (!restaurante) return null
    return RestauranteMapper.RestauranteDetalladoEntityFromObject(restaurante.toObject())
  }

  async obtenerRestaurantePorId(id: string): Promise<RestauranteDetalladoEntity> {
    if (!isValidObjectId(id)) throw CustomErrors.badRequest(`El id:${id} no es valido`)

    const restaurante: RestauranteDocument | null = await RestuaranteModelo.findById(id).populate(
      'usuario_id'
    )

    if (!restaurante)
      throw CustomErrors.badRequest(`No existe ningun restaurante identificado con el id ${id}`)
    return RestauranteMapper.RestauranteDetalladoEntityFromObject(restaurante.toObject())
  }
  async registrarRestaurante(
    registrarRestauranteDto: RegistrarRestauranteDto,
    options: OptionsRegistrarRestaurante
  ): Promise<RestauranteEntity> {
    try {
      let session: ClientSession | undefined
      session = options?.session

      const restaurante = new RestuaranteModelo(registrarRestauranteDto)
      const restauranteGuardado: RestauranteDocument = await restaurante.save({ session })

      return RestauranteMapper.RestauranteEntityFromObject(restauranteGuardado.toObject())
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
}
