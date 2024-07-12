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
import { MenuMapper, PlatoMapper } from '../mappers'
import { ObtenerMenuDto } from '../../domain/dtos/menu/obtener-menu.dto'

export class MongoMenuDatasourceImpl implements MenuDatasource {
  async obtenerMenu(obtenerMenuDto: ObtenerMenuDto): Promise<MenuEntity> {
    try {
      const { menu_id } = obtenerMenuDto
      if (!isValidObjectId(menu_id)) throw CustomErrors.badRequest(`El id:${menu_id} no es valido`)
      const menu = await MenuModel.findById(menu_id)
        .populate([{ path: 'platos_ids', populate: ['categoria_id', 'hashtag_id'] }])
        .lean()

      if (!menu) throw CustomErrors.badRequest('No existe ningun menu con ese id')
      const platosSinMapear = menu?.platos_ids
      const platosMappeados = platosSinMapear.map((p) => PlatoMapper.PlatoEntityFromObject(p))

      let menuMapeado = MenuMapper.MenuEntityFromObject({
        ...menu,
        platos_ids: platosMappeados
      })
      return menuMapeado
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
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
