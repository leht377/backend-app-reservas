import { Router } from 'express'
import { MenuController } from './controller'
import {
  MongoMenuDatasourceImpl,
  MongoPlatoDatasourceImpl,
  MongoRestauranteDataSourceImpl,
  S3ImageDatasourceImpl
} from '../../infrastructure/datasources'
import {
  ImageRepositoryImpl,
  MenuRepositoryImpl,
  PlatoRepositoryImpl,
  RestauranteRepositoryImpl
} from '../../infrastructure/repositories'

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

    const platoDatasource = new MongoPlatoDatasourceImpl()
    const platoRepository = new PlatoRepositoryImpl(platoDatasource)

    const imageDatasource = new S3ImageDatasourceImpl()
    const imageRepository = new ImageRepositoryImpl(imageDatasource)
    const controller = new MenuController(
      menuRepository,
      restauranteRepository,
      platoRepository,
      transationManager,
      imageRepository
    )
    router.post('/', AuthMiddleware.ValidateJWT, controller.registrarMenu)
    router.post('/:id/platos', AuthMiddleware.ValidateJWT, controller.registrarPlato)
    router.get('/:id', controller.obtenerMenu)
    return router
  }
}
