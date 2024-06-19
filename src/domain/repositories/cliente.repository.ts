import { AgregarFavoritoDto, EliminarFavoritoDto } from '../dtos'
import { RegistrarClienteDto } from '../dtos/cliente/registrar-cliente.dto'
import { ClienteDetalladoEntity, ClienteEntity, RestauranteDetalladoEntity } from '../entities'
import { OptionsRegistrarCliente } from '../interfaces'

export abstract class ClienteRepository {
  abstract registrarCliente(
    registrarClienteDto: RegistrarClienteDto,
    options?: OptionsRegistrarCliente
  ): Promise<ClienteEntity>
  abstract obtenerClientePorId(id: string): Promise<ClienteDetalladoEntity>
  abstract obtenerClientePorUsuarioId(id: string): Promise<ClienteDetalladoEntity | null>
  abstract obtenerRestaurantesFavoritos(id: string): Promise<RestauranteDetalladoEntity[]>
  abstract agregarRestauranteFavorito(
    agregarFavoritoDto: AgregarFavoritoDto
  ): Promise<ClienteDetalladoEntity>
  abstract eliminarRestauranteFavorito(
    eliminarFavoritoDto: EliminarFavoritoDto
  ): Promise<ClienteDetalladoEntity>
}
