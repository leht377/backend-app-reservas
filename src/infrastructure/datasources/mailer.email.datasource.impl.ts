import { envs } from '../../config'
import { EmailDatasource } from '../../domain/datasources/email.datasoucer'
import { SentEmailDto } from '../../domain/dtos/email/sentEmail.dto'
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: envs.USER_EMAIL, // Reemplaza con tu dirección de correo electrónico
    pass: envs.PASS_SERVICIO_GMAIL // Reemplaza con tu contraseña
  }
})

export class MailerEmailDataSourceImpl implements EmailDatasource {
  async sendEmail(sentEmailDto: SentEmailDto): Promise<boolean> {
    const mailOptions = {
      from: envs.USER_EMAIL, // Remitente
      to: sentEmailDto.email, // Destinatario
      subject: sentEmailDto.subject,
      html: sentEmailDto.plantilla
    }

    try {
      const info = await transporter.sendMail(mailOptions)
      // console.log('Correo electrónico enviado: ' + info)
      return true
    } catch (error) {
      console.log('error: ' + error)
      return false
    }
  }
}
