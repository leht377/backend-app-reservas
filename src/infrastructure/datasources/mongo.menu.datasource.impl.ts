import mongoose, { ClientSession, isValidObjectId } from 'mongoose'
import { MenuModel } from '../../data'
import {
  CustomErrors,
  MenuDatasource,
  MenuEntity,
  OptiosAgregarPlatoMenu,
  OptiosRegistrarMenu
} from '../../domain'
import { AgregarPlatoDto, RegistrarMenuDto } from '../../domain/dtos/menu'
import { MenuMapper } from '../mappers'

export class MongoMenuDatasourceImpl implements MenuDatasource {
  async agregarPlatoMenu(
    agregarPlatoDto: AgregarPlatoDto,
    options?: OptiosAgregarPlatoMenu | undefined
  ): Promise<void> {
    try {
      let session: ClientSession | undefined
      session = options?.session
      const { menu_id, plato_id } = agregarPlatoDto
      if (!isValidObjectId(plato_id)) throw CustomErrors.badRequest('El id del plato no es valido')
      if (!isValidObjectId(menu_id)) throw CustomErrors.badRequest('El id del menu no es valido')

      await MenuModel.findByIdAndUpdate(
        menu_id,
        { $push: { platos_ids: plato_id } },
        { runValidators: true, session }
      )
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
  async registrarMenu(
    registrarMenuDto: RegistrarMenuDto,
    options?: OptiosRegistrarMenu
  ): Promise<MenuEntity> {
    let session: ClientSession | undefined
    session = options?.session

    if (!isValidObjectId(registrarMenuDto.restaurante_id))
      throw CustomErrors.badRequest('El id del restaurante no es valido')
    const menu = new MenuModel({ restaurante_id: registrarMenuDto.restaurante_id })
    const menuCreado = await menu.save({ session })
    return MenuMapper.MenuEntityFromObject(menuCreado?.toObject())
  }
}
