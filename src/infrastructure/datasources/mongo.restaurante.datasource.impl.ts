import mongoose, { ClientSession } from 'mongoose'
import {
  CustomErrors,
  OptionsRegistrarRestaurante,
  RestauranteDataSource,
  RestauranteEntity
} from '../../domain'
import { RegistrarRestauranteDto } from '../../domain/dtos/restaurante/registrar-restaurante.dto'
import { RestauranteDocument, RestuaranteModelo } from '../../data'
import { RestauranteMapper } from '../mappers'

export class MongoRestauranteDataSourceImpl implements RestauranteDataSource {
  async registrarRestaurante(
    registrarRestauranteDto: RegistrarRestauranteDto,
    options: OptionsRegistrarRestaurante
  ): Promise<RestauranteEntity> {
    try {
      let session: ClientSession | undefined
      session = options?.session

      const restaurante = new RestuaranteModelo(registrarRestauranteDto)
      const restauranteGuardado: RestauranteDocument = await restaurante.save({ session })
      console.log(restauranteGuardado)
      return RestauranteMapper.RestauranteEntityFromObject(restauranteGuardado.toObject())
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
}
