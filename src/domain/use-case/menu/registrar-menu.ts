import { ActualizarRestauranteDto, RegistrarMenuDto } from '../../dtos'
import { MenuEntity } from '../../entities'
import { MenuRepository, RestauranteRepository } from '../../repositories'
import { ActualizarRestaurante } from '../restaurante'

export class RegistrarMenu {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly restauranteRepository: RestauranteRepository
  ) {}
  async execute(registrarMenuDto: RegistrarMenuDto, session?: any): Promise<MenuEntity> {
    const menu = await this.menuRepository.registrarMenu(registrarMenuDto, { session: session })

    const menu_id = menu.getId()

    const actualizarRestauranteDto = ActualizarRestauranteDto.crear({
      menu_id: menu_id,
      usuario_id: registrarMenuDto.usuario_id,
      id: registrarMenuDto.restaurante_id
    })

    await new ActualizarRestaurante(this.restauranteRepository).execute(
      actualizarRestauranteDto,
      session
    )

    return menu
  }
}
