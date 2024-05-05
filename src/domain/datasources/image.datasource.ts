import { UploadImageDto } from '../dtos'

export abstract class ImageDatasouce {
  abstract upload(uploadImageDto: UploadImageDto): Promise<string[]>
}
