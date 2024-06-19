import {
  AgregarFavoritoDto,
  ClienteDataSource,
  ClienteDetalladoEntity,
  ClienteEntity,
  ClienteRepository,
  EliminarFavoritoDto,
  OptionsRegistrarCliente,
  RegistrarClienteDto,
  RestauranteDetalladoEntity
} from '../../domain'

export class ClienteRepositoryImpl implements ClienteRepository {
  constructor(private readonly clienteDatasource: ClienteDataSource) {}
  obtenerRestaurantesFavoritos(id: string): Promise<RestauranteDetalladoEntity[]> {
    return this.clienteDatasource.obtenerRestaurantesFavoritos(id)
  }
  eliminarRestauranteFavorito(
    eliminarFavoritoDto: EliminarFavoritoDto
  ): Promise<ClienteDetalladoEntity> {
    return this.clienteDatasource.eliminarRestauranteFavorito(eliminarFavoritoDto)
  }
  agregarRestauranteFavorito(
    agregarFavoritoDto: AgregarFavoritoDto
  ): Promise<ClienteDetalladoEntity> {
    return this.clienteDatasource.agregarRestauranteFavorito(agregarFavoritoDto)
  }
  obtenerClientePorUsuarioId(id: string): Promise<ClienteDetalladoEntity | null> {
    return this.clienteDatasource.obtenerClientePorUsuarioId(id)
  }
  obtenerClientePorId(id: string): Promise<ClienteDetalladoEntity> {
    return this.clienteDatasource.obtenerClientePorId(id)
  }

  registrarCliente(
    registrarClienteDto: RegistrarClienteDto,
    options?: OptionsRegistrarCliente | undefined
  ): Promise<ClienteEntity> {
    return this.clienteDatasource.registrarCliente(registrarClienteDto, options)
  }
}
