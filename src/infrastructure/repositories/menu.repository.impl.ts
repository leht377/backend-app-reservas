import { MenuDatasource, MenuEntity, MenuRepository, OptiosRegistrarMenu } from '../../domain'
import { RegistrarMenuDto } from '../../domain/dtos/menu'

export class MenuRepositoryImpl implements MenuRepository {
  constructor(private readonly menuDataSource: MenuDatasource) {}
  registrarMenu(
    registrarMenuDto: RegistrarMenuDto,
    options?: OptiosRegistrarMenu
  ): Promise<MenuEntity> {
    return this.menuDataSource.registrarMenu(registrarMenuDto, options)
  }
}
