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
import { MailRepositoryImpl } from '../../infrastructure/repositories/email.repository.impl'
import { MailerEmailDataSourceImpl } from '../../infrastructure/datasources/mailer.email.datasource.impl'

export class ReservaRoutes {
  static get routes(): Router {
    const router = Router()

    const clienteDataSource = new MongoClienteDatasourceImpl()
    const clienteRepository = new ClienteRepositoryImpl(clienteDataSource)

    const restauranteDataSource = new MongoRestauranteDataSourceImpl()
    const restauranteRepository = new RestauranteRepositoryImpl(restauranteDataSource)

    const emailDatasource = new MailerEmailDataSourceImpl()
    const emailRepository = new MailRepositoryImpl(emailDatasource)

    const datasorce = new MongoReservaDatasourceImpl()
    const repository = new ReservaRepositoryImpl(datasorce)
    const controller = new ReservaController(
      repository,
      restauranteRepository,
      clienteRepository,
      emailRepository
    )

    router.post('/', AuthMiddleware.ValidateJWT, controller.registrarReserva)
    router.get('/:id', AuthMiddleware.ValidateJWT, controller.obtenerReservaPorId)
    router.post('/:id/aceptar', AuthMiddleware.ValidateJWT, controller.aceptarReserva)
    router.post('/:id/rechazar', AuthMiddleware.ValidateJWT, controller.rechazarReserva)
    router.post('/:id/cancelar', AuthMiddleware.ValidateJWT, controller.cancelarReserva)

    return router
  }
}
