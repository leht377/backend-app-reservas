import { NextFunction, Request, Response } from 'express'
import { CustomErrors, RestauranteRepository } from '../../domain'
import { ObtenerRestaurantePorId } from '../../domain/use-case/restaurante'

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
}
