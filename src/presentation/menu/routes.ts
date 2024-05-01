import { Router } from 'express'
import { MenuController } from './controller'
import {
  MongoMenuDatasourceImpl,
  MongoRestauranteDataSourceImpl
} from '../../infrastructure/datasources'
import { MenuRepositoryImpl, RestauranteRepositoryImpl } from '../../infrastructure/repositories'

import { MongoTransationManagerImpl } from '../../infrastructure/transations/mongo.trasation.manager'
import { AuthMiddleware } from '../middlewares/auth.middleware'

export class MenuRoutes {
  static get routes(): Router {
    const router = Router()

    const menuDataSource = new MongoMenuDatasourceImpl()
    const menuRepository = new MenuRepositoryImpl(menuDataSource)
    const transationManager = new MongoTransationManagerImpl()

    const restauranteDataSource = new MongoRestauranteDataSourceImpl()
    const restauranteRepository = new RestauranteRepositoryImpl(restauranteDataSource)

    const controller = new MenuController(menuRepository, restauranteRepository, transationManager)
    router.post('/', AuthMiddleware.ValidateJWT, controller.registrarMenu)
    return router
  }
}
