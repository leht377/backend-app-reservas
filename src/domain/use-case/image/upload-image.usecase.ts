import { UploadImageDto } from '../../dtos'
import { CustomErrors } from '../../errors'
import { ImageRepository } from '../../repositories'

export class UploadImage {
  constructor(private readonly imageRepository: ImageRepository) {}

  async execute(uploadImageDto: UploadImageDto): Promise<string[]> {
    if (uploadImageDto.files.length === 0)
      CustomErrors.badRequest('No se seleccionado ninguna imagen a subir')
    if (uploadImageDto.files.length > 5)
      CustomErrors.badRequest('No se puede subir mas de 5 imagenes a la vez')
    const url_images = await this.imageRepository.upload(uploadImageDto)
    return url_images
  }
}
