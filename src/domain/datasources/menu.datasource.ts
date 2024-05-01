import { RegistrarMenuDto } from '../dtos/menu/registrar-menu.dto'
import { MenuEntity } from '../entities'

export abstract class MenuDatasource {
  abstract registrarMenu(registrarMenuDto: RegistrarMenuDto): Promise<MenuEntity>
  // abstract ObtenerMenu(): Promise<MenuEntity>
}
