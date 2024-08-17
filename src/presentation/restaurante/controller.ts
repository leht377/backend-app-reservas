import { NextFunction, Request, Response } from 'express'
import {
  AceptarReservaDto,
  ActualizarRestauranteDto,
  CalificacionRepository,
  CalificarRestuaranteDto,
  CustomErrors,
  DeleteFotoIntalacionDto,
  ImageRepository,
  ObtenerRestauranteDto,
  ObtnerReservaDto,
  ObtnerReservaRestauranteDto,
  RechazarReservaDto,
  ReservaRepository,
  RestauranteRepository,
  TransationManager,
  UploadFotoIntalacionDto,
  UploadImageDto,
  filesObject
} from '../../domain'
import {
  ActualizarRestaurante,
  CalificarRestuarante,
  DeleteFotoIntalacion,
  ObtenerReservasRestaurante,
  ObtenerRestaurantePorId,
  ObtenerRestaurantes,
  UploadFotoIntalacion
} from '../../domain/use-case/restaurante'
import { limpiarFiles } from '../../common/utils/cleanTempFiles'

import { fileObjectGenerator } from '../../common/helpers/fileObjectGenerator'
import { UploadImage } from '../../domain/use-case/image'

export class RestauranteController {
  constructor(
    private readonly restauranteRepository: RestauranteRepository,
    private readonly reservaRepository: ReservaRepository,
    private readonly imageRepository: ImageRepository,
    private readonly calificacionRepository: CalificacionRepository,
    private readonly transationManager: TransationManager
  ) {}

  obtenerRestaurantePorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params?.id
      if (!id) throw CustomErrors.badRequest('El id del restaurante no fue proveido')
      const restaurante = await new ObtenerRestaurantePorId(this.restauranteRepository).execute(id)
      res.json(restaurante)
    } catch (error) {
      next(error)
    }
  }

  obtenerRestaurantes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query = {} } = req

      const obtenerRestauranteDto = ObtenerRestauranteDto.crear(query)

      const restaurantes = await new ObtenerRestaurantes(this.restauranteRepository).execute(
        obtenerRestauranteDto
      )
      res.json(restaurantes)
    } catch (error) {
      next(error)
    }
  }

  actualizarRestaurante = async (req: Request, res: Response, next: NextFunction) => {
    const restaurante_id = req.params?.id
    const usuario_id = req?.body.usuarioToken?.id || req?.body.usuarioToken?._id
    let foto_restaurante
    try {
      if (req.files) {
        const files = fileObjectGenerator(req.files!)
        if (files.length > 1) throw CustomErrors.badRequest('Unicamente se puede subir una foto ')
        const uploadImageDto = UploadImageDto.crear(files)
        const urlImagenes = await new UploadImage(this.imageRepository).execute(uploadImageDto)
        foto_restaurante = urlImagenes[0]
      }

      const actualizarRestauranteDto = ActualizarRestauranteDto.crear({
        ...req.body,
        id: restaurante_id,
        usuario_id,
        foto_restaurante
      })

      const restaurante = await new ActualizarRestaurante(this.restauranteRepository).execute(
        actualizarRestauranteDto
      )

      res.json(restaurante)
    } catch (error) {
      next(error)
    } finally {
      if (req.files) limpiarFiles(req?.files)
    }
  }

  calificarRestaurante = async (req: Request, res: Response, next: NextFunction) => {
    const session = await this.transationManager.startSession()
    try {
      const data = {
        ...req.body,
        restaurante_id: req.params?.id,
        cliente_id: req.body?.usuarioToken?.usuario_rol_id,
        usuario_id: req.body?.usuarioToken?._id || req.body?.usuarioToken?.id
      }
      const calificarRestuaranteDto = CalificarRestuaranteDto.crear(data)

      const restaurante = await new CalificarRestuarante(
        this.restauranteRepository,
        this.calificacionRepository
      ).execute(calificarRestuaranteDto, session)

      await this.transationManager.commit(session)
      res.json(restaurante)
    } catch (error) {
      await this.transationManager.abort(session)
      next(error)
    }
  }

  obtenerReservas = async (req: Request, res: Response, next: NextFunction) => {
    const usuario = req.body.usuarioToken
    const restaurante_id = req.params?.id
    const usuario_rol_id = usuario?.usuario_rol_id
    const { query = {} } = req

    try {
      if (restaurante_id?.toString() != usuario_rol_id?.toString())
        throw CustomErrors.badRequest(
          'El usuario no se encuentra autorizado para consultar esta informacion'
        )

      const obtenerReservasDto = ObtnerReservaRestauranteDto.crear({ restaurante_id, query })
      const reservas = await new ObtenerReservasRestaurante(
        this.reservaRepository,
        this.restauranteRepository
      ).execute(obtenerReservasDto)

      res.json(reservas)
    } catch (error) {
      next(error)
    }
  }

  uploadFotoIntalacion = async (req: Request, res: Response, next: NextFunction) => {
    const restaurante_id = req.params?.id
    const usuario_id = req.body?.usuarioToken?.usuario_rol_id
    let foto_intalacion

    try {
      if (restaurante_id?.toString() != usuario_id?.toString()) {
        throw CustomErrors.badRequest('No cuentas con permiso para modificar esta informacion')
      }

      if (!req.files) throw CustomErrors.badRequest('Es necesaria la foto a cargar')

      const files = fileObjectGenerator(req.files!)
      if (files.length > 1) throw CustomErrors.badRequest('Unicamente se puede subir una foto ')
      const uploadImageDto = UploadImageDto.crear(files)
      const urlImagenes = await new UploadImage(this.imageRepository).execute(uploadImageDto)
      foto_intalacion = urlImagenes[0]

      const actualizarRestauranteDto = UploadFotoIntalacionDto.crear({
        restaurante_id: restaurante_id,
        url_foto_instalacion: foto_intalacion
      })

      const restaurante = await new UploadFotoIntalacion(this.restauranteRepository).execute(
        actualizarRestauranteDto
      )

      res.json(restaurante)
    } catch (error) {
      next(error)
    } finally {
      if (req.files) limpiarFiles(req?.files)
    }
  }

  deleteFotoIntalacion = async (req: Request, res: Response, next: NextFunction) => {
    const restaurante_id = req.params?.id
    const usuario_id = req.body?.usuarioToken?.usuario_rol_id
    const foto_id = req.params?.foto_id

    try {
      if (restaurante_id?.toString() != usuario_id?.toString()) {
        throw CustomErrors.badRequest('No cuentas con permiso para modificar esta informacion')
      }

      const deleteFotoIntalacionDto = DeleteFotoIntalacionDto.crear({
        restaurante_id: restaurante_id,
        foto_id: foto_id
      })

      const restaurante = await new DeleteFotoIntalacion(this.restauranteRepository).execute(
        deleteFotoIntalacionDto
      )

      res.json(restaurante)
    } catch (error) {
      next(error)
    } finally {
      if (req.files) limpiarFiles(req?.files)
    }
  }
}
