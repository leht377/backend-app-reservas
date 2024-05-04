import { Router } from 'express'
import { ReservaController } from './controller'
import {
  ClienteRepositoryImpl,
  ReservaRepositoryImpl,
  RestauranteRepositoryImpl
} from '../../infrastructure/repositories'

import {
  MongoClienteDatasourceImpl,
  MongoReservaDatasourceImpl,
  MongoRestauranteDataSourceImpl
} from '../../infrastructure/datasources'
import { AuthMiddleware } from '../middlewares/auth.middleware'

export class ReservaRoutes {
  static get routes(): Router {
    const router = Router()

    const clienteDataSource = new MongoClienteDatasourceImpl()
    const clienteRepository = new ClienteRepositoryImpl(clienteDataSource)

    const restauranteDataSource = new MongoRestauranteDataSourceImpl()
    const restauranteRepository = new RestauranteRepositoryImpl(restauranteDataSource)

    const datasorce = new MongoReservaDatasourceImpl()
    const repository = new ReservaRepositoryImpl(datasorce)
    const controller = new ReservaController(repository, restauranteRepository, clienteRepository)

    router.post('/', AuthMiddleware.ValidateJWT, controller.registrarReserva)
    router.get('/:id', AuthMiddleware.ValidateJWT, controller.obtenerReservaPorId)

    return router
  }
}
