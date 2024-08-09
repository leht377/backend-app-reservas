import { SentEmailDto } from '../../domain/dtos/email/sentEmail.dto'
import { EmailRepository } from '../../domain/repositories/email.repository'

export class MailRepositoryImpl implements EmailRepository {
  constructor(private readonly mailDatasource: EmailRepository) {}
  async sendEmail(sendEmailDto: SentEmailDto): Promise<boolean> {
    return this.mailDatasource.sendEmail(sendEmailDto)
  }
}
