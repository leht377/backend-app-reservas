import { Router } from 'express'
import { RestauranteController } from './controller'
import { RestauranteRepositoryImpl } from '../../infrastructure/repositories/restaurante.repository.impl'
import { MongoRestauranteDataSourceImpl } from '../../infrastructure/datasources/mongo.restaurante.datasource.impl'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { MongoReservaDatasourceImpl } from '../../infrastructure/datasources'
import { ReservaRepositoryImpl } from '../../infrastructure/repositories'

export class RestauranteRoutes {
  static get routes(): Router {
    const router = Router()

    const reservaDatasource = new MongoReservaDatasourceImpl()
    const reservaRepository = new ReservaRepositoryImpl(reservaDatasource)

    const dataSource = new MongoRestauranteDataSourceImpl()
    const repository = new RestauranteRepositoryImpl(dataSource)
    const controller = new RestauranteController(repository, reservaRepository)

    router.get('/:id', controller.obtenerRestaurantePorId)
    router.put('/:id', AuthMiddleware.ValidateJWT, controller.actualizarRestaurante)

    router.put(
      '/:id_restaurante/reservas/:id_reserva/aceptar',
      AuthMiddleware.ValidateJWT,
      controller.aceptarReserva
    )

    router.put(
      '/:id_restaurante/reservas/:id_reserva/rechazar',
      AuthMiddleware.ValidateJWT,
      controller.rechazarReserva
    )
    router.get('/', controller.obtenerRestaurantes)
    return router
  }
}
