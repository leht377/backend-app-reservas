import { UploadImageDto } from '../dtos'

export abstract class ImageRepository {
  abstract upload(uploadImageDto: UploadImageDto): Promise<string[]>
}
