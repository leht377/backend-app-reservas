import { RegistrarMenuDto } from '../dtos/menu'
import { MenuEntity } from '../entities'
import { OptiosRegistrarMenu } from '../interfaces'

export abstract class MenuRepository {
  abstract registrarMenu(
    registrarMenuDto: RegistrarMenuDto,
    options?: OptiosRegistrarMenu
  ): Promise<MenuEntity>
}
