import { NextFunction, Request, Response } from 'express'
import {
  ImageRepository,
  MenuRepository,
  PlatoRepository,
  RegistrarMenuDto,
  RestauranteRepository,
  TransationManager,
  UploadImageDto
} from '../../domain'
import { RegistrarMenu } from '../../domain/use-case/menu'
import { RegistrarPlato } from '../../domain/use-case/plato'
import { RegistrarPlatoDto } from '../../domain/dtos/plato'
import { ObtenerMenuDto } from '../../domain/dtos/menu/obtener-menu.dto'
import { ObtenerMenu } from '../../domain/use-case/menu/obtener-menu.usecase'
import { fileObjectGenerator } from '../../common/helpers/fileObjectGenerator'
import { UploadImage } from '../../domain/use-case/image'
import { FileArray } from 'express-fileupload'

export class MenuController {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly restauranteRepository: RestauranteRepository,
    private readonly platoRepository: PlatoRepository,
    private readonly transationManager: TransationManager,
    private readonly imageRepository: ImageRepository
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
    let url_foto_principal
    let url_fotos_secundarias
    try {
      if (req.files) {
        const files = fileObjectGenerator(req.files)
        const s = files.filter((e) => e.key === 'url_foto_principal')
        const uploadImageDto = UploadImageDto.crear(s)
        const urlImagenes = await new UploadImage(this.imageRepository).execute(uploadImageDto)
        url_foto_principal = urlImagenes[0]
      }
      if (req.files) {
        const files = fileObjectGenerator(req.files)
        const s = files.filter((e) => e.key === 'url_fotos_secundarias')
        const uploadImageDto = UploadImageDto.crear(s)

        const urlImagenes = await new UploadImage(this.imageRepository).execute(uploadImageDto)
        url_fotos_secundarias = urlImagenes
      }

      const registrarPlatoDto = RegistrarPlatoDto.crear({
        ...req.body,
        menu_id,
        url_foto_principal,
        url_fotos_secundarias
      })
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

  obtenerMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const obtenerMenuDto = ObtenerMenuDto.crear({ menu_id: req.params?.id })
      const menu = await new ObtenerMenu(this.menuRepository).execute(obtenerMenuDto)
      res.json(menu)
    } catch (error) {
      next(error)
    }
  }
}
