import { ActualizarRestauranteDto, AgregarPlatoDto } from '../../dtos'
import { RegistrarPlatoDto } from '../../dtos/plato'
import { PlatoEntity } from '../../entities'
import { CustomErrors } from '../../errors'
import { MenuRepository, PlatoRepository, RestauranteRepository } from '../../repositories'
import { AgregarPlato } from '../menu'
import { ObtenerRestaurantePorId } from '../restaurante'

export class RegistrarPlato {
  constructor(
    private readonly platoRepository: PlatoRepository,
    private readonly menuRepository: MenuRepository
  ) {}

  async execute(registrarPlatoDto: RegistrarPlatoDto, session: any): Promise<PlatoEntity> {
    // const restaurante = await new ObtenerRestaurantePorId(this.restauranteRepository).execute(
    //   registrarPlatoDto.restaurante_id
    // )

    // if (restaurante.getMenuId()?.toString() != registrarPlatoDto.menu_id) {
    //   throw CustomErrors.badRequest(`El menu no pertenece al restaurante`)
    // }

    const plato = await this.platoRepository.registrar(registrarPlatoDto, { session })
    const agregarPlatoDto = AgregarPlatoDto.crear({
      plato_id: plato.getId,
      menu_id: registrarPlatoDto.menu_id
    })

    await new AgregarPlato(this.menuRepository).execute(agregarPlatoDto, session)

    return plato
  }
}
