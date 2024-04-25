import { Router } from 'express'

export class ClienteRoutes {
  static get routes(): Router {
    const router = Router()

    router.get('/', (req, res) => {
      res.json({ hola: 'mundo' })
    })

    return router
  }
}
