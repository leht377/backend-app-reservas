import { Router } from 'express'
import { ClienteController } from './controller'
import { ClienteRepositoryImpl } from '../../infrastructure/repositories/cliente.repository.impl'
import { MongoClienteDatasourceImpl } from '../../infrastructure/datasources/mongo.cliente.datasource.impl'
import { UsuarioRepositoryImpl } from '../../infrastructure/repositories/usuario.repository.impl'
import { MongoUsuarioDatasourceImpl } from '../../infrastructure/datasources/mongo.usuario.datasource.impl'

export class ClienteRoutes {
  static get routes(): Router {
    const router = Router()

    const clienteDataSource = new MongoClienteDatasourceImpl()
    const clienteReposity = new ClienteRepositoryImpl(clienteDataSource)

    const usuarioDataSource = new MongoUsuarioDatasourceImpl()
    const usuarioRepository = new UsuarioRepositoryImpl(usuarioDataSource)

    // console.log(usuarioRepository)
    const controller = new ClienteController(clienteReposity, usuarioRepository)

    router.post('/', controller.crearCliente)

    return router
  }
}
