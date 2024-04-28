import { Router } from 'express'
import { ClienteController } from './controller'
import { ClienteRepositoryImpl } from '../../infrastructure/repositories/cliente.repository.impl'
import { MongoClienteDatasourceImpl } from '../../infrastructure/datasources/mongo.cliente.datasource.impl'

export class ClienteRoutes {
  static get routes(): Router {
    const router = Router()

    const dataSource = new MongoClienteDatasourceImpl()
    const repository = new ClienteRepositoryImpl(dataSource)
    const controller = new ClienteController(repository)

    router.get('/:id', controller.obtenerClientePorId)
    return router
  }
}
