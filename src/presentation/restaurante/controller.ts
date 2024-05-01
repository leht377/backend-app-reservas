import { NextFunction, Request, Response } from 'express'
import { ActualizarRestauranteDto, CustomErrors, RestauranteRepository } from '../../domain'
import {
  ActualizarRestaurante,
  ObtenerRestaurantePorId,
  ObtenerRestaurantes
} from '../../domain/use-case/restaurante'
import { ObtenerRestauranteDto } from '../../domain/dtos/restaurante/obtener-restaurantes.dto'

export class RestauranteController {
  constructor(private readonly restauranteRepository: RestauranteRepository) {}

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
    try {
      const actualizarRestauranteDto = ActualizarRestauranteDto.crear({
        ...req.body,
        id: restaurante_id
      })

      const restaurante = await new ActualizarRestaurante(this.restauranteRepository).execute(
        actualizarRestauranteDto
      )
      res.json(restaurante)
    } catch (error) {
      next(error)
    }
  }
}
