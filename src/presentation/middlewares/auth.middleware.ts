import { NextFunction, Request, Response } from 'express'

import { ClienteModel, RestuaranteModelo, UsuarioModel } from '../../data/mongodb'
import { JwtAdapter } from '../../common/utils/jwt'
import { TokenPayload } from '../../domain'
import { UsuarioRol } from '../../common/utils'

export class AuthMiddleware {
  static async ValidateJWT(req: Request, res: Response, next: NextFunction) {
    const autorization = req.header('Authorization')
    if (!autorization) return res.status(401).json({ error: 'Token no provided' })
    if (!autorization.startsWith('Bearer'))
      return res.status(401).json({ error: 'Invalid Bearer Token' })

    const token = autorization.split(' ').at(1) || ''

    try {
      const payload = await JwtAdapter.validateToken<TokenPayload>(token)
      if (!payload) return res.status(401).json({ error: 'Invalid token' })

      const user = await UsuarioModel.findById(payload.usuario_id)
      if (!user) return res.status(401).json({ error: 'Invalid token - user not found' })

      if (user?.rol === UsuarioRol.CLIENTE) {
        const cliente = await ClienteModel.findOne({ usuario_id: user._id })
        if (!cliente)
          res.status(500).json({ error: 'No se encontro ningun cliente asociado a la cuenta' })
        req.body.usuarioToken = { ...user?.toObject(), usuario_rol_id: cliente?._id }
      } else if (user?.rol === UsuarioRol.RESTAURANTE) {
        const restaurante = await RestuaranteModelo.findOne({ usuario_id: user._id })
        if (!restaurante)
          res.status(500).json({ error: 'No se encontro ningun restaurante asociado a la cuenta' })
        req.body.usuarioToken = { ...user?.toObject(), usuario_rol_id: restaurante?._id }
      }

      next()
    } catch (error) {
      next(error)
    }
  }

  static validateUserRole(roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const userFromToken = req.body.usuarioToken
      if (!userFromToken) return res.status(401).json({ error: 'Missing user' })

      try {
        const user = await UsuarioModel.findById(userFromToken?.id || userFromToken?._id)
        if (!user) return res.status(401).json({ error: 'User not found' })

        const userRoles = user.rol || []

        // Check if any of the user's roles match the required roles
        const hasAuthorization = roles.some((role) => userRoles.includes(role))
        if (!hasAuthorization)
          return res.status(403).json({ error: 'User does not have authorization' })

        next()
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }
}
