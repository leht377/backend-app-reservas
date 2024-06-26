import { ClienteDocument, ClienteModel } from '../../data/mongodb'
import {
  AgregarFavoritoDto,
  ClienteDataSource,
  ClienteDetalladoEntity,
  ClienteEntity,
  CustomErrors,
  EliminarFavoritoDto,
  OptionsRegistrarCliente,
  RegistrarClienteDto,
  RestauranteDetalladoEntity
} from '../../domain'
import { ClienteMapper, RestauranteMapper } from '../mappers'
import mongoose, { ClientSession, isValidObjectId } from 'mongoose'
export class MongoClienteDatasourceImpl implements ClienteDataSource {
  async obtenerRestaurantesFavoritos(id: string): Promise<RestauranteDetalladoEntity[]> {
    try {
      if (!isValidObjectId(id)) throw CustomErrors.badRequest('El cliente_id no es valido')

      const cliente: ClienteDocument | null = await ClienteModel.findById(id)
        .populate([{ path: 'restaurantes_favoritos_ids', populate: ['usuario_id'] }])
        .lean()

      if (!cliente) throw CustomErrors.badRequest(`No existe ningun cliente asociado al id: ${id} `)
      return cliente.restaurantes_favoritos_ids?.map((r) =>
        RestauranteMapper.RestauranteDetalladoEntityFromObject(r)
      )
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
  async eliminarRestauranteFavorito(
    eliminarFavoritoDto: EliminarFavoritoDto
  ): Promise<ClienteDetalladoEntity> {
    try {
      const { cliente_id, restaurante_id } = eliminarFavoritoDto

      if (!isValidObjectId(cliente_id)) throw CustomErrors.badRequest('El cliente_id no es valido')
      if (!isValidObjectId(restaurante_id))
        throw CustomErrors.badRequest('El restaurante_id no es valido')

      const cliente = await ClienteModel.findByIdAndUpdate(
        cliente_id,
        {
          $pull: { restaurantes_favoritos_ids: restaurante_id }
        },
        { runValidators: true, new: true }
      ).populate('usuario_id')

      if (!cliente)
        throw CustomErrors.badRequest(`No existe ningun cliente asociado al id: ${cliente_id} `)
      return ClienteMapper.ClienteDetalladoEntityFromObject(cliente?.toObject())
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
  async agregarRestauranteFavorito(
    agregarFavoritoDto: AgregarFavoritoDto
  ): Promise<ClienteDetalladoEntity> {
    try {
      const { cliente_id, restaurante_id } = agregarFavoritoDto

      if (!isValidObjectId(cliente_id)) throw CustomErrors.badRequest('El cliente_id no es valido')
      if (!isValidObjectId(restaurante_id))
        throw CustomErrors.badRequest('El restaurante_id no es valido')

      const cliente = await ClienteModel.findByIdAndUpdate(
        cliente_id,
        {
          $push: { restaurantes_favoritos_ids: restaurante_id }
        },
        { runValidators: true, new: true }
      ).populate('usuario_id')

      if (!cliente)
        throw CustomErrors.badRequest(`No existe ningun cliente asociado al id: ${cliente_id} `)
      return ClienteMapper.ClienteDetalladoEntityFromObject(cliente?.toObject())
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
  async obtenerClientePorUsuarioId(id: string): Promise<ClienteDetalladoEntity | null> {
    if (!isValidObjectId(id)) throw CustomErrors.badRequest('El id no es valido')
    const cliente = await ClienteModel.findOne({ usuario_id: id }).populate('usuario_id')
    if (!cliente) return null
    return ClienteMapper.ClienteDetalladoEntityFromObject(cliente.toObject())
  }
  //
  async obtenerClientePorId(id: string): Promise<ClienteDetalladoEntity> {
    if (!isValidObjectId(id)) throw CustomErrors.badRequest('El id no es valido')
    const cliente = await ClienteModel.findById(id).populate('usuario_id')
    if (!cliente) throw CustomErrors.badRequest(`No existe ningun cliente asociado al id ${id}`)
    return ClienteMapper.ClienteDetalladoEntityFromObject(cliente.toObject())
  }

  async registrarCliente(
    registrarClienteDto: RegistrarClienteDto,
    options?: OptionsRegistrarCliente | undefined
  ): Promise<ClienteEntity> {
    try {
      let session: ClientSession | undefined
      session = options?.session

      const cliente = new ClienteModel(registrarClienteDto)
      const clienteCreado = await cliente.save({ session })

      return ClienteMapper.ClienteEntityFromObject(clienteCreado.toObject())
    } catch (error: any) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
}
