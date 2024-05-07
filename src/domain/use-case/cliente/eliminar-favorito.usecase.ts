import { EliminarFavoritoDto } from '../../dtos'
import { ClienteDetalladoEntity } from '../../entities'
import { ClienteRepository } from '../../repositories'

export class eliminarFavorito {
  constructor(private readonly clienteRepository: ClienteRepository) {}
  async execute(eliminarFavoritoDto: EliminarFavoritoDto): Promise<ClienteDetalladoEntity> {
    const { cliente_id, restaurante_id } = eliminarFavoritoDto

    // const cliente = await this.clienteRepository.obtenerClientePorId(cliente_id)

    // if (
    //   cliente
    //     ?.getRestaurantesFavoritosIds()
    //     .map((e) => e?.toString())
    //     .includes(restaurante_id)
    // )
    //   return cliente

    const clienteActualizado = await this.clienteRepository.eliminarRestauranteFavorito(
      eliminarFavoritoDto
    )
    return clienteActualizado
  }
}
