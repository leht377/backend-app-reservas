import { ImageDatasouce, ImageRepository, UploadImageDto } from '../../domain'

export class ImageRepositoryImpl implements ImageRepository {
  constructor(private readonly imageDatasource: ImageDatasouce) {}
  upload(uploadImageDto: UploadImageDto): Promise<string[]> {
    return this.imageDatasource.upload(uploadImageDto)
  }
}
