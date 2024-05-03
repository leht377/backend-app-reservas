import { AgregarPlatoDto } from '../dtos'
import { RegistrarMenuDto } from '../dtos/menu/registrar-menu.dto'
import { MenuEntity } from '../entities'
import { OptiosAgregarPlatoMenu, OptiosRegistrarMenu } from '../interfaces'

export abstract class MenuDatasource {
  abstract registrarMenu(
    registrarMenuDto: RegistrarMenuDto,
    options?: OptiosRegistrarMenu
  ): Promise<MenuEntity>
  abstract agregarPlatoMenu(
    agregarPlatoDto: AgregarPlatoDto,
    options?: OptiosAgregarPlatoMenu
  ): Promise<void>
  // abstract ObtenerMenu(): Promise<MenuEntity>
}
