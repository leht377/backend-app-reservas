import { validators } from '../../../common/helpers'
import { CustomErrors } from '../../errors'
import { ObjectoGenerico } from '../../types'

export class SentEmailDto {
  private constructor(
    public readonly email: string,
    public readonly plantilla: string,
    public readonly subject: string
  ) {}
  static create(data: ObjectoGenerico): SentEmailDto {
    const { email, plantilla, subject } = data

    if (!email) throw CustomErrors.internalServer('email no se encuentra')
    if (!subject) throw CustomErrors.internalServer('subject no se encuentra')
    if (!validators.email.test(email)) throw CustomErrors.internalServer('email no valido')
    if (!plantilla) throw CustomErrors.internalServer('plantilla no se encuentra')
    if (typeof plantilla != 'string')
      throw CustomErrors.internalServer('plantilla debe de ser un string')
    if (typeof subject != 'string')
      throw CustomErrors.internalServer('subject debe de ser un string')

    return new SentEmailDto(email, plantilla, subject)
  }
}
