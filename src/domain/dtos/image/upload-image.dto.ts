import { CustomErrors } from '../../errors'
import { filesObject } from '../../interfaces'

export class UploadImageDto {
  private constructor(public readonly files: filesObject[]) {}

  static crear(files: filesObject[]): UploadImageDto {
    if (files.length === 0)
      throw CustomErrors.forbidden('Debe existir almenos un elemento para hacer upload')
    return new UploadImageDto(files)
  }
}
