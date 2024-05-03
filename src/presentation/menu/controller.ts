import { NextFunction, Request, Response } from 'express'
import {
  MenuRepository,
  PlatoRepository,
  RegistrarMenuDto,
  RestauranteRepository,
  TransationManager
} from '../../domain'
import { RegistrarMenu } from '../../domain/use-case/menu'
import { RegistrarPlato } from '../../domain/use-case/plato'
import { RegistrarPlatoDto } from '../../domain/dtos/plato'

export class MenuController {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly restauranteRepository: RestauranteRepository,
    private readonly platoRepository: PlatoRepository,
    private readonly transationManager: TransationManager
  ) {}

  registrarMenu = async (req: Request, res: Response, next: NextFunction) => {
    const session = await this.transationManager.startSession()
    const { usuarioToken } = req.body
    const usuario_id = usuarioToken?._id || usuarioToken?.id
    try {
      const registrarMenuDto = RegistrarMenuDto.crear({ ...req.body, usuario_id: usuario_id })
      const menu = await new RegistrarMenu(this.menuRepository, this.restauranteRepository).execute(
        registrarMenuDto,
        session
      )
      await this.transationManager.commit(session)
      res.json(menu)
    } catch (error) {
      await this.transationManager.abort(session)
      next(error)
    }
  }

  registrarPlato = async (req: Request, res: Response, next: NextFunction) => {
    const session = await this.transationManager.startSession()
    const menu_id = req.params?.id
    try {
      const registrarPlatoDto = RegistrarPlatoDto.crear({ ...req.body, menu_id })
      const plato = await new RegistrarPlato(this.platoRepository, this.menuRepository).execute(
        registrarPlatoDto,
        session
      )
      await this.transationManager.commit(session)
      res.json(plato)
    } catch (error) {
      await this.transationManager.abort(session)
      next(error)
    }
  }
}
