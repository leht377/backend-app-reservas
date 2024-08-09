import { SentEmailDto } from '../dtos/email/sentEmail.dto'

export abstract class EmailDatasource {
  abstract sendEmail(sentEmailDto: SentEmailDto): Promise<boolean>
}
