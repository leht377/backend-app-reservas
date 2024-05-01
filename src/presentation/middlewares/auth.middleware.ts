import { NextFunction, Request, Response } from 'express'

import { UsuarioModel } from '../../data/mongodb'
import { JwtAdapter } from '../../common/utils/jwt'
import { TokenPayload } from '../../domain'

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

      req.body.usuarioToken = user

      next()
    } catch (error) {
      next(error)
    }
  }

  // static validateUserRole(roles: string[]) {
  //   return async (req: Request, res: Response, next: NextFunction) => {
  //     const userFromToken = req.body.user
  //     if (!userFromToken) return res.status(401).json({ error: 'Missing user' })

  //     try {
  //       const user = await UserModel.findById(userFromToken?.id)
  //       if (!user) return res.status(401).json({ error: 'User not found' })

  //       const userRoles = user.roles || []

  //       // Check if any of the user's roles match the required roles
  //       const hasAuthorization = roles.some((role) => userRoles.includes(role))
  //       if (!hasAuthorization)
  //         return res
  //           .status(403)
  //           .json({ error: 'User does not have authorization' })

  //       next()
  //     } catch (error) {
  //       return res.status(500).json({ error: 'Internal Server Error' })
  //     }
  //   }
  // }
}
