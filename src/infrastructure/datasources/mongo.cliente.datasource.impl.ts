import { ClienteModel } from '../../data/mongodb'
import {
  ClienteDataSource,
  ClienteDetalladoEntity,
  ClienteEntity,
  CustomErrors,
  OptionsRegistrarCliente,
  RegistrarClienteDto
} from '../../domain'
import { ClienteMapper } from '../mappers'
import mongoose, { ClientSession, isValidObjectId } from 'mongoose'
export class MongoClienteDatasourceImpl implements ClienteDataSource {
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
