import jwt from 'jsonwebtoken'
import { envs } from '../../config'
import { TokenPayload } from '../../domain'

const JWT_SEED = envs.SEED_TOKEN_SECRET
export class JwtAdapter {
  static async generateToken(
    payload: TokenPayload,
    duration: string = '2h'
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null)
        resolve(token!)
      })
    })
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, docoded) => {
        if (err) return resolve(null)
        resolve(docoded as T)
      })
    })
  }
}
