import { Router } from 'express'
import { CustomMiddleware, ErrorHandlerMiddleware } from './middlewares'
import { AuthRoutes } from './auth'
import { ClienteRoutes } from './cliente/routes'
import { RestauranteRoutes } from './restaurante/routes'
import { MenuRoutes } from './menu/routes'
import { CategoriaRoutes } from './categoria/routes'
import { HashtagRoutes } from './hashtag/routes'

export class AppRoutes {
  static get routes(): Router {
    const routes = Router()

    routes.use('/api/auth', AuthRoutes.routes)
    routes.use('/api/clientes', ClienteRoutes.routes)
    routes.use('/api/restaurantes', RestauranteRoutes.routes)
    routes.use('/api/menus', MenuRoutes.routes)
    routes.use('/api/categorias', CategoriaRoutes.routes)
    routes.use('/api/hashtag', HashtagRoutes.routes)

    routes.use(CustomMiddleware.UnknowEnpoint)
    routes.use(ErrorHandlerMiddleware.ErrorHandler)
    return routes
  }
}
