import { NextFunction, Request, Response } from 'express'
import {
  AceptarReservaDto,
  ActualizarRestauranteDto,
  CustomErrors,
  ObtenerRestauranteDto,
  RechazarReservaDto,
  ReservaRepository,
  RestauranteRepository
} from '../../domain'
import {
  AceptarReserva,
  ActualizarRestaurante,
  ObtenerRestaurantePorId,
  ObtenerRestaurantes,
  RechazarReserva
} from '../../domain/use-case/restaurante'

export class RestauranteController {
  constructor(
    private readonly restauranteRepository: RestauranteRepository,
    private readonly reservaRepository: ReservaRepository
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
    try {
      const actualizarRestauranteDto = ActualizarRestauranteDto.crear({
        ...req.body,
        id: restaurante_id,
        usuario_id
      })

      const restaurante = await new ActualizarRestaurante(this.restauranteRepository).execute(
        actualizarRestauranteDto
      )
      res.json(restaurante)
    } catch (error) {
      next(error)
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
