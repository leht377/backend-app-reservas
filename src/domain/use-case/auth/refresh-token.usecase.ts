import { JwtAdapter } from '../../../common/utils/jwt'
import { RefreshTokenDto } from '../../dtos'
import { CustomErrors } from '../../errors'
import { TokenPayload, UserToken } from '../../interfaces'
type DecodedToken<T> = T | null
type SignToken = (payload: TokenPayload, duration?: string) => Promise<string | null>
type ValidateToken = <T>(token: string) => Promise<DecodedToken<T>>

export class RefreshToken {
  constructor(
    private readonly validateToken: ValidateToken = JwtAdapter.validateToken,
    private readonly validateRefreshToken: ValidateToken = JwtAdapter.validateRefreshToken,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
    private readonly singRefreshToken: SignToken = JwtAdapter.generateRefreshToken
  ) {}

  async execute(refreshTokenDto: RefreshTokenDto): Promise<UserToken> {
    const { refresh_token } = refreshTokenDto
    const payloadDecodeRefreshToken: TokenPayload | null = await this.validateRefreshToken(
      refresh_token
    )

    if (!payloadDecodeRefreshToken) throw CustomErrors.unautorized('token perdido')

    const payload: TokenPayload = {
      correo: payloadDecodeRefreshToken.correo,
      id: payloadDecodeRefreshToken.id,
      rol: payloadDecodeRefreshToken.rol,
      usuario_id: payloadDecodeRefreshToken.usuario_id
    }
    const token = await this.signToken(payload)
    const refreshToken = await this.singRefreshToken(payload, '1d')

    if (!token) throw CustomErrors.internalServer('Token no pudo ser firmado')
    if (!refreshToken) throw CustomErrors.internalServer('refreshToken no pudo ser firmado')

    const userToken: UserToken = {
      refreshToken: refreshToken,
      token: token,
      usuario: {
        id: payload.usuario_id,
        correo: payload.correo,
        rol: payload.rol
      }
    }
    return userToken
  }
}
