import { SentEmailDto } from '../dtos/email/sentEmail.dto'

export abstract class EmailRepository {
  abstract sendEmail(sendEmailDto: SentEmailDto): Promise<boolean>
}
