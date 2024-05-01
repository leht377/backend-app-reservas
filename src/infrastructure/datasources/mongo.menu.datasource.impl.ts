import { ClientSession, isValidObjectId } from 'mongoose'
import { MenuModel } from '../../data'
import { CustomErrors, MenuDatasource, MenuEntity, OptiosRegistrarMenu } from '../../domain'
import { RegistrarMenuDto } from '../../domain/dtos/menu'
import { MenuMapper } from '../mappers'

export class MongoMenuDatasourceImpl implements MenuDatasource {
  async registrarMenu(
    registrarMenuDto: RegistrarMenuDto,
    options?: OptiosRegistrarMenu
  ): Promise<MenuEntity> {
    let session: ClientSession | undefined
    session = options?.session

    if (!isValidObjectId(registrarMenuDto.restaurante_id))
      throw CustomErrors.badRequest('El id del restaurante no es validp')
    const menu = new MenuModel({ restaurante_id: registrarMenuDto.restaurante_id })
    const menuCreado = await menu.save({ session })
    return MenuMapper.MenuEntityFromObject(menuCreado?.toObject())
  }
}
