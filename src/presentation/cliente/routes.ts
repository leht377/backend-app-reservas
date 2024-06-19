import { Router } from 'express'
import { ClienteController } from './controller'
import { ClienteRepositoryImpl } from '../../infrastructure/repositories/cliente.repository.impl'
import { MongoClienteDatasourceImpl } from '../../infrastructure/datasources/mongo.cliente.datasource.impl'
import { MongoReservaDatasourceImpl } from '../../infrastructure/datasources'
import { ReservaRepositoryImpl } from '../../infrastructure/repositories'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { UsuarioRol } from '../../common/utils'

export class ClienteRoutes {
  static get routes(): Router {
    const router = Router()

    const reservaDatasource = new MongoReservaDatasourceImpl()
    const reservaRepository = new ReservaRepositoryImpl(reservaDatasource)

    const dataSource = new MongoClienteDatasourceImpl()
    const repository = new ClienteRepositoryImpl(dataSource)
    const controller = new ClienteController(repository, reservaRepository)

    router.get('/:id', controller.obtenerClientePorId)
    router.put(
      '/:id_cliente/restaurantes/:id_restaurante/addfavorito',
      [AuthMiddleware.ValidateJWT, AuthMiddleware.validateUserRole([UsuarioRol.CLIENTE])],
      controller.agregarRestauranteFavorito
    )
    router.get(
      '/:id_cliente/restaurantes/favoritos',
      [AuthMiddleware.ValidateJWT, AuthMiddleware.validateUserRole([UsuarioRol.CLIENTE])],
      controller.obtenerRestaurantesFavoritos
    )
    router.put(
      '/:id_cliente/restaurantes/:id_restaurante/deletefavorito',
      [AuthMiddleware.ValidateJWT, AuthMiddleware.validateUserRole([UsuarioRol.CLIENTE])],
      controller.eliminarRestauranteFavorito
    )
    router.put(
      '/:id_cliente/reservas/:id_reserva/cancelar',
      AuthMiddleware.ValidateJWT,
      controller.cancelarReserva
    )
    router.get(
      '/:id_cliente/reservas',
      [AuthMiddleware.ValidateJWT, AuthMiddleware.validateUserRole([UsuarioRol.CLIENTE])],
      controller.obtenerReservas
    )
    return router
  }
}
