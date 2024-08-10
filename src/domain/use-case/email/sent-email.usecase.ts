import { plantillasEmail } from '../../../common/helpers/plantillasEmail'
import { AsuntoEmailReservas, TypePlantillaEmail } from '../../../common/utils/enums/email.enum'
import { SentEmailDto } from '../../dtos/email/sentEmail.dto'
import { ClienteDetalladoEntity, ReservaEntity, RestauranteDetalladoEntity } from '../../entities'
import { EmailRepository } from '../../repositories/email.repository'

export class SentEmail {
  constructor(private readonly emailRepository: EmailRepository) {}
  async execute(
    emailRemitente: string,
    asunto: AsuntoEmailReservas,
    tipoPlantilla: TypePlantillaEmail,
    clienteInfo: ClienteDetalladoEntity,
    restauranteInfo: RestauranteDetalladoEntity,
    reservaInfo: ReservaEntity
  ): Promise<boolean> {
    const sentEmailDto = SentEmailDto.create({
      email: emailRemitente,
      plantilla: plantillasEmail(tipoPlantilla, clienteInfo, restauranteInfo, reservaInfo),
      subject: asunto
    })

    return await this.emailRepository.sendEmail(sentEmailDto)
  }
}
