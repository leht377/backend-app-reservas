import { CustomErrors } from '../../errors'
import { ObjectoGenerico } from '../../types'

export class RefreshTokenDto {
  private constructor(public readonly refresh_token: string) {}

  static crear(object: ObjectoGenerico): RefreshTokenDto {
    const { refresh_token } = object
    if (!refresh_token) throw CustomErrors.unautorized('token perdido iu')
    return new RefreshTokenDto(refresh_token)
  }
}
