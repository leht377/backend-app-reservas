import { ObtenerMenuDto } from '../../dtos/menu/obtener-menu.dto'
import { MenuEntity } from '../../entities'
import { MenuRepository } from '../../repositories'

export class ObtenerMenu {
  constructor(private readonly menuRepository: MenuRepository) {}

  async execute(obtenerMenuDto: ObtenerMenuDto): Promise<MenuEntity> {
    return await this.menuRepository.obtenerMenu(obtenerMenuDto)
  }
}
