import { ClientSession } from 'mongoose'
import { ClienteModel } from '../../data/mongodb'
import { ClienteEntity, CrearClienteDto, UsuarioEntity, clienteDataSource } from '../../domain'
import { ClienteMapper } from '../mappers/cliente.mapper'

export class MongoClienteDatasourceImpl implements clienteDataSource {
  async crearCliente(
    crearClienteDto: CrearClienteDto,
    usuarioEntity: UsuarioEntity,
    session?: ClientSession
  ): Promise<ClienteEntity> {
    const { apellido, nombre, usuario_id } = crearClienteDto

    try {
      const cliente = new ClienteModel({
        nombre: nombre,
        apellido: apellido,
        usuario_id: usuario_id
      })
      const clienteCreado = await cliente.save({ session })

      const clienteUsuario = {
        ...clienteCreado.toObject(),
        correo: usuarioEntity.correo,
        rol: usuarioEntity.rol,
        usuario_id: usuarioEntity.id
      }

      return ClienteMapper.clienteEntityFromObject(clienteUsuario)
    } catch (error) {
      throw error
    }
  }
  async obtenersClientes(): Promise<ClienteEntity> {
    throw new Error('Method not implemented.')
  }
}
