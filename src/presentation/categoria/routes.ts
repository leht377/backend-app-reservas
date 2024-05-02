import { Router } from 'express'
import { CategoriaController } from './controller'
import { CategoriaRepositoryImpl } from '../../infrastructure/repositories'
import { MongoCategoriaDatasourceImpl } from '../../infrastructure/datasources'

export class CategoriaRoutes {
  static get routes(): Router {
    const router = Router()
    const dataSource = new MongoCategoriaDatasourceImpl()
    const repository = new CategoriaRepositoryImpl(dataSource)
    const controller = new CategoriaController(repository)

    router.post('/', controller.crear)
    return router
  }
}
