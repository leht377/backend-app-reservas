import { AgregarFavoritoDto } from '../../dtos'
import { ClienteDetalladoEntity } from '../../entities'
import { ClienteRepository } from '../../repositories'

export class AgregarFavorito {
  constructor(private readonly clienteRepository: ClienteRepository) {}
  async execute(agregarFavoritoDto: AgregarFavoritoDto): Promise<ClienteDetalladoEntity> {
    const { cliente_id, restaurante_id } = agregarFavoritoDto

    const cliente = await this.clienteRepository.obtenerClientePorId(cliente_id)

    if (
      cliente
        ?.getRestaurantesFavoritosIds()
        .map((e) => e?.toString())
        .includes(restaurante_id)
    )
      return cliente

    const clienteActualizado = await this.clienteRepository.agregarRestauranteFavorito(
      agregarFavoritoDto
    )
    return clienteActualizado
  }
}
