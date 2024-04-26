import { CrearClienteDto } from '../dtos'
import { ClienteEntity, UsuarioEntity } from '../entities'

export abstract class clienteDataSource {
  abstract crearCliente(
    crearClienteDto: CrearClienteDto,
    usuarioEntity: UsuarioEntity,
    session: any
  ): Promise<ClienteEntity>
  abstract obtenersClientes(): Promise<ClienteEntity>
}
