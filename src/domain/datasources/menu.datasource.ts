import { RegistrarMenuDto } from '../dtos/menu/registrar-menu.dto'
import { MenuEntity } from '../entities'
import { OptiosRegistrarMenu } from '../interfaces'

export abstract class MenuDatasource {
  abstract registrarMenu(
    registrarMenuDto: RegistrarMenuDto,
    options?: OptiosRegistrarMenu
  ): Promise<MenuEntity>
  // abstract ObtenerMenu(): Promise<MenuEntity>
}
