import { NextFunction, Request, Response } from 'express'
import {
  AceptarReservaDto,
  ActualizarRestauranteDto,
  CustomErrors,
  ImageRepository,
  ObtenerRestauranteDto,
  RechazarReservaDto,
  ReservaRepository,
  RestauranteRepository,
  UploadImageDto,
  filesObject
} from '../../domain'
import {
  AceptarReserva,
  ActualizarRestaurante,
  ObtenerRestaurantePorId,
  ObtenerRestaurantes,
  RechazarReserva
} from '../../domain/use-case/restaurante'
import { limpiarFiles } from '../../common/utils/cleanTempFiles'
import { FileArray } from 'express-fileupload'
import { fileObjectGenerator } from '../../common/helpers/fileObjectGenerator'
import { UploadImage } from '../../domain/use-case/image'

export class RestauranteController {
  constructor(
    private readonly restauranteRepository: RestauranteRepository,
    private readonly reservaRepository: ReservaRepository,
    private readonly imageRepository: ImageRepository
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

  aceptarReserva = async (req: Request, res: Response, next: NextFunction) => {
    const usuario = req.body.usuarioToken
    const usuario_token_id = usuario?._id || usuario?.id
    const restaurante_id = req.params?.id_restaurante
    const reserva_id = req.params?.id_reserva
    const rol_usuario = usuario?.rol
    const usuario_rol_id = usuario?.usuario_rol_id
    try {
      const aceptarReservaDto = AceptarReservaDto.crear({
        usuario_token_id,
        restaurante_id,
        reserva_id,
        rol_usuario,
        usuario_rol_id
      })

      const reserva = await new AceptarReserva(
        this.restauranteRepository,
        this.reservaRepository
      ).execute(aceptarReservaDto)

      res.json(reserva)
    } catch (error) {
      next(error)
    }
  }
  rechazarReserva = async (req: Request, res: Response, next: NextFunction) => {
    const usuario = req.body.usuarioToken
    const usuario_token_id = usuario?._id || usuario?.id
    const restaurante_id = req.params?.id_restaurante
    const reserva_id = req.params?.id_reserva
    const rol_usuario = usuario?.rol
    const usuario_rol_id = usuario?.usuario_rol_id
    try {
      const rechazarReservaDto = RechazarReservaDto.crear({
        usuario_token_id,
        restaurante_id,
        reserva_id,
        rol_usuario,
        usuario_rol_id
      })

      const reserva = await new RechazarReserva(
        this.restauranteRepository,
        this.reservaRepository
      ).execute(rechazarReservaDto)

      res.json(reserva)
    } catch (error) {
      next(error)
    }
  }
}
