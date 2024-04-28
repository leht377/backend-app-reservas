import { ClienteModel } from '../../data/mongodb'
import {
  ClienteDataSource,
  ClienteEntity,
  CustomErrors,
  OptionsRegistrarCliente,
  RegistrarClienteDto
} from '../../domain'
import { clienteMapper } from '../mappers'
import mongoose, { ClientSession } from 'mongoose'
export class MongoClienteDatasourceImpl implements ClienteDataSource {
  async registrarCliente(
    registrarClienteDto: RegistrarClienteDto,
    options?: OptionsRegistrarCliente | undefined
  ): Promise<ClienteEntity> {
    try {
      let session: ClientSession | undefined
      session = options?.session

      const cliente = new ClienteModel(registrarClienteDto)
      const clienteCreado = await cliente.save({ session })

      return clienteMapper.ClienteEntityFromObject(clienteCreado.toObject())
    } catch (error: any) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
}
