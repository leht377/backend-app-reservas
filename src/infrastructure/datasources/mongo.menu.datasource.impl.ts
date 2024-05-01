import { MenuDatasource, MenuEntity } from '../../domain'
import { RegistrarMenuDto } from '../../domain/dtos/menu'

export class MongoMenuDatasourceImpl implements MenuDatasource {
  registrarMenu(registrarMenuDto: RegistrarMenuDto): Promise<MenuEntity> {
    throw new Error('Method not implemented.')
  }
}
