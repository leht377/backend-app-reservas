import { MenuDatasource, MenuEntity, MenuRepository } from '../../domain'
import { RegistrarMenuDto } from '../../domain/dtos/menu'

export class MenuRepositoryImpl implements MenuRepository {
  constructor(private readonly menuDataSource: MenuDatasource) {}
  registrarMenu(registrarMenuDto: RegistrarMenuDto): Promise<MenuEntity> {
    return this.menuDataSource.registrarMenu(registrarMenuDto)
  }
}
