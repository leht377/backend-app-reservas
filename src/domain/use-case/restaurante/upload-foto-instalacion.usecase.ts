import { UploadFotoIntalacionDto } from '../../dtos'
import { RegistrarRestauranteDto } from '../../dtos/restaurante/registrar-restaurante.dto'
import { RestauranteDetalladoEntity, RestauranteEntity } from '../../entities'
import { CustomErrors } from '../../errors'
import { RestauranteRepository } from '../../repositories'

export class UploadFotoIntalacion {
  constructor(private readonly restauranteRepository: RestauranteRepository) {}
  async execute(
    uploadFotoInstalacion: UploadFotoIntalacionDto
  ): Promise<RestauranteDetalladoEntity> {
    const restauranteEnBd = await this.restauranteRepository.obtenerRestaurantePorId(
      uploadFotoInstalacion.restaurante_id
    )

    if (restauranteEnBd.getUrlFotosInstalaciones().length >= 5)
      throw CustomErrors.badRequest('Solo es posible cargar 5 imagenes de las instalaciones')

    const restaurante = await this.restauranteRepository.uploadFotoInstalacion(
      uploadFotoInstalacion
    )
    return restaurante
  }
}
