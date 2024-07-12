import {
  MenuDatasource,
  MenuEntity,
  MenuRepository,
  OptiosAgregarPlatoMenu,
  OptiosRegistrarMenu
} from '../../domain'
import { AgregarPlatoDto, RegistrarMenuDto } from '../../domain/dtos/menu'
import { ObtenerMenuDto } from '../../domain/dtos/menu/obtener-menu.dto'

export class MenuRepositoryImpl implements MenuRepository {
  constructor(private readonly menuDataSource: MenuDatasource) {}
  obtenerMenu(obtenerMenuDto: ObtenerMenuDto): Promise<MenuEntity> {
    return this.menuDataSource.obtenerMenu(obtenerMenuDto)
  }
  async agregarPlatoMenu(
    agregarPlatoDto: AgregarPlatoDto,
    options?: OptiosAgregarPlatoMenu | undefined
  ): Promise<void> {
    return this.menuDataSource.agregarPlatoMenu(agregarPlatoDto, options)
  }
  registrarMenu(
    registrarMenuDto: RegistrarMenuDto,
    options?: OptiosRegistrarMenu
  ): Promise<MenuEntity> {
    return this.menuDataSource.registrarMenu(registrarMenuDto, options)
  }
}
