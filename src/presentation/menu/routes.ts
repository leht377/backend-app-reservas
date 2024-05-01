import { Router } from 'express'
import { MenuController } from './controller'
import { MongoMenuDatasourceImpl } from '../../infrastructure/datasources'
import { MenuRepositoryImpl } from '../../infrastructure/repositories'

export class MenuRoutes {
  static get routes(): Router {
    const router = Router()
    const menuDataSource = new MongoMenuDatasourceImpl()
    const menuRepository = new MenuRepositoryImpl(menuDataSource)
    const controller = new MenuController(menuRepository)
    router.post('/', controller.registrarMenu)
    return router
  }
}
