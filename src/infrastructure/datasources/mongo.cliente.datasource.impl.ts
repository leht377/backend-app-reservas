import { ClienteModel } from '../../data/mongodb'
import { ClienteDataSource, ClienteEntity, RegistrarClienteDto } from '../../domain'
import { clienteMapper } from '../mappers'

export class MongoClienteDatasourceImpl implements ClienteDataSource {
  async registrarCliente(registrarClienteDto: RegistrarClienteDto): Promise<ClienteEntity> {
    try {
      const cliente = new ClienteModel(registrarClienteDto)
      const clienteCreado = await cliente.save()
      return clienteMapper.ClienteEntityFromObject(clienteCreado.toObject())
    } catch (error) {
      throw error
    }
  }
}
