import { Router } from 'express'
import { AuthController } from './controller'
import { UsuarioRepositoryImpl } from '../../infrastructure/repositories/usuario.repository.impl'
import { MongoUsuarioDataSourceImpl } from '../../infrastructure/datasources/mongo.usuario.datasource.impl'
import { MongoClienteDatasourceImpl } from '../../infrastructure/datasources/mongo.cliente.datasource.impl'
import { ClienteRepositoryImpl } from '../../infrastructure/repositories/cliente.repository.impl'

export class AuthRoutes {
  static get routes(): Router {
    const router = Router()

    const usuarioDataSource = new MongoUsuarioDataSourceImpl()
    const usuarioRepository = new UsuarioRepositoryImpl(usuarioDataSource)

    const clienteDatasource = new MongoClienteDatasourceImpl()
    const clienteRepository = new ClienteRepositoryImpl(clienteDatasource)

    const controller = new AuthController(usuarioRepository, clienteRepository)

    router.post('/login', controller.login)
    router.post('/registrar/clientes', controller.registrarCliente)
    router.post('/registrar/restaurantes', controller.registrarRestaurante)

    return router
  }
}
