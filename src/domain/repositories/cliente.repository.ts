import { CrearClienteDto } from '../dtos'
import { ClienteEntity, UsuarioEntity } from '../entities'

export abstract class ClienteRepository {
  abstract crearCliente(
    crearClienteDto: CrearClienteDto,
    usuarioEntity: UsuarioEntity,
    session: any
  ): Promise<ClienteEntity>
  abstract obtenerClientes(): Promise<ClienteEntity[]>
}
