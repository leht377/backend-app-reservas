import { AgregarPlatoDto, RegistrarMenuDto } from '../dtos/menu'
import { MenuEntity } from '../entities'
import { OptiosAgregarPlatoMenu, OptiosRegistrarMenu } from '../interfaces'

export abstract class MenuRepository {
  abstract registrarMenu(
    registrarMenuDto: RegistrarMenuDto,
    options?: OptiosRegistrarMenu
  ): Promise<MenuEntity>

  abstract agregarPlatoMenu(
    agregarPlatoDto: AgregarPlatoDto,
    options?: OptiosAgregarPlatoMenu
  ): Promise<void>
}
