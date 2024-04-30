import { Router } from 'express'
import { AuthController } from './controller'
import { UsuarioRepositoryImpl } from '../../infrastructure/repositories/usuario.repository.impl'
import { MongoUsuarioDataSourceImpl } from '../../infrastructure/datasources/mongo.usuario.datasource.impl'
import { MongoClienteDatasourceImpl } from '../../infrastructure/datasources/mongo.cliente.datasource.impl'
import { ClienteRepositoryImpl } from '../../infrastructure/repositories/cliente.repository.impl'
import { MongoTransationManagerImpl } from '../../infrastructure/transations/mongo.trasation.manager'
import { MongoRestauranteDataSourceImpl } from '../../infrastructure/datasources/mongo.restaurante.datasource.impl'
import { RestauranteRepositoryImpl } from '../../infrastructure/repositories/restaurante.repository.impl'

export class AuthRoutes {
  static get routes(): Router {
    const router = Router()

    const usuarioDataSource = new MongoUsuarioDataSourceImpl()
    const usuarioRepository = new UsuarioRepositoryImpl(usuarioDataSource)

    const clienteDatasource = new MongoClienteDatasourceImpl()
    const clienteRepository = new ClienteRepositoryImpl(clienteDatasource)

    const restauranteDataSource = new MongoRestauranteDataSourceImpl()
    const restauranteRepository = new RestauranteRepositoryImpl(restauranteDataSource)

    const transationManager = new MongoTransationManagerImpl()
    const controller = new AuthController(
      usuarioRepository,
      clienteRepository,
      restauranteRepository,
      transationManager
    )

    router.post('/login', controller.login)
    router.post('/registrar/clientes', controller.registrarCliente)
    router.post('/registrar/restaurantes', controller.registrarRestaurante)

    return router
  }
}
