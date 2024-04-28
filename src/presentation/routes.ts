import { Router } from 'express'
import { CustomMiddleware, ErrorHandlerMiddleware } from './middlewares'
import { AuthRoutes } from './auth'
import { ClienteRoutes } from './cliente/routes'

export class AppRoutes {
  static get routes(): Router {
    const routes = Router()

    routes.use('/api/auth', AuthRoutes.routes)
    routes.use('/api/clientes', ClienteRoutes.routes)

    routes.use(CustomMiddleware.UnknowEnpoint)
    routes.use(ErrorHandlerMiddleware.ErrorHandler)
    return routes
  }
}
