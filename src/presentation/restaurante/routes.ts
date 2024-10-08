import { Router } from 'express'
import { RestauranteController } from './controller'
import { RestauranteRepositoryImpl } from '../../infrastructure/repositories/restaurante.repository.impl'
import { MongoRestauranteDataSourceImpl } from '../../infrastructure/datasources/mongo.restaurante.datasource.impl'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import {
  MongoCalificacionDatasourceImpl,
  MongoReservaDatasourceImpl,
  S3ImageDatasourceImpl
} from '../../infrastructure/datasources'
import {
  CalificacionRepositoryImpl,
  ImageRepositoryImpl,
  ReservaRepositoryImpl
} from '../../infrastructure/repositories'
import { UsuarioRol } from '../../common/utils'
import { MongoTransationManagerImpl } from '../../infrastructure/transations/mongo.trasation.manager'

export class RestauranteRoutes {
  static get routes(): Router {
    const router = Router()

    const reservaDatasource = new MongoReservaDatasourceImpl()
    const reservaRepository = new ReservaRepositoryImpl(reservaDatasource)

    const imageDatasource = new S3ImageDatasourceImpl()
    const imageRepository = new ImageRepositoryImpl(imageDatasource)

    const calificacionDatasource = new MongoCalificacionDatasourceImpl()
    const calificacionRepository = new CalificacionRepositoryImpl(calificacionDatasource)

    const transationManager = new MongoTransationManagerImpl()
    const dataSource = new MongoRestauranteDataSourceImpl()
    const repository = new RestauranteRepositoryImpl(dataSource)

    const controller = new RestauranteController(
      repository,
      reservaRepository,
      imageRepository,
      calificacionRepository,
      transationManager
    )

    router.get('/:id', controller.obtenerRestaurantePorId)
    router.put('/:id', AuthMiddleware.ValidateJWT, controller.actualizarRestaurante)
    router.put(
      '/:id/instalaciones',
      AuthMiddleware.ValidateJWT,
      AuthMiddleware.validateUserRole([UsuarioRol.RESTAURANTE]),
      controller.uploadFotoIntalacion
    )
    router.delete(
      '/:id/instalaciones/:foto_id',
      AuthMiddleware.ValidateJWT,
      AuthMiddleware.validateUserRole([UsuarioRol.RESTAURANTE]),
      controller.deleteFotoIntalacion
    )

    router.post(
      '/:id/calificar',
      [AuthMiddleware.ValidateJWT, AuthMiddleware.validateUserRole([UsuarioRol.CLIENTE])],
      controller.calificarRestaurante
    )

    router.get('/', controller.obtenerRestaurantes)

    router.get(
      '/:id/reservas',
      [AuthMiddleware.ValidateJWT, AuthMiddleware.validateUserRole([UsuarioRol.RESTAURANTE])],
      controller.obtenerReservas
    )
    return router
  }
}
