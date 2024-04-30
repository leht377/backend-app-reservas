import { Router } from 'express'
import { RestauranteController } from './controller'
import { RestauranteRepositoryImpl } from '../../infrastructure/repositories/restaurante.repository.impl'
import { MongoRestauranteDataSourceImpl } from '../../infrastructure/datasources/mongo.restaurante.datasource.impl'

export class RestauranteRoutes {
  static get routes(): Router {
    const router = Router()

    const dataSource = new MongoRestauranteDataSourceImpl()
    const repository = new RestauranteRepositoryImpl(dataSource)
    const controller = new RestauranteController(repository)
    router.get('/:id', controller.obtenerRestaurantePorId)
    return router
  }
}
