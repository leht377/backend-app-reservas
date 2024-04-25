import { Router } from 'express'
import { ClienteRoutes } from './cliente'
import { CustomMiddleware } from './middlewares/custom.middleaware'

export class AppRoutes {
  static get routes(): Router {
    const routes = Router()

    routes.use('/api/clientes', ClienteRoutes.routes)
    routes.use(CustomMiddleware.UnknowEnpoint)
    return routes
  }
}
