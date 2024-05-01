import { RegistrarMenuDto } from '../dtos/menu'
import { MenuEntity } from '../entities'

export abstract class MenuRepository {
  abstract registrarMenu(registrarMenuDto: RegistrarMenuDto): Promise<MenuEntity>
}
