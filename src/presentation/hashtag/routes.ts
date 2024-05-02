import { Router } from 'express'
import { HashtagController } from './controller'

import { MongoHashtagDatasourceImpl } from '../../infrastructure/datasources'
import { MongoHashtagRepository } from '../../infrastructure/repositories'

export class HashtagRoutes {
  static get routes(): Router {
    const router = Router()
    const datasource = new MongoHashtagDatasourceImpl()
    const repository = new MongoHashtagRepository(datasource)
    const controller = new HashtagController(repository)

    router.post('/', controller.registrarHashtag)
    router.get('/', controller.ObtenerHashtags)
    return router
  }
}
