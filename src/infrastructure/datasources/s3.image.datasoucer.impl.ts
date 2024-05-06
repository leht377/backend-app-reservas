import { envs } from '../../config'
import fs from 'fs'
import { ImageDatasouce, UploadImageDto } from '../../domain'
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'

export class S3ImageDatasourceImpl implements ImageDatasouce {
  private readonly client = new S3Client({
    region: envs.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: envs.AWS_PUBLIC_KEY,
      secretAccessKey: envs.AWS_SECRET_KEY
    }
  })

  async upload(uploadImageDto: UploadImageDto): Promise<string[]> {
    const filesNames: string[] = []
    const files = uploadImageDto.files
    try {
      const uploadPromises = files.map(({ nombre, tempFilePath }) => {
        const stream = fs.createReadStream(tempFilePath)
        let fileName
        fileName = nombre.replace(/\s+/g, '')
        filesNames.push(`${envs.AWS_URI_OBJECT}/${fileName}`)
        const uploadParams = {
          Bucket: envs.AWS_BUCKET_NAME,
          Key: fileName,
          Body: stream
        }
        const command = new PutObjectCommand(uploadParams)
        return this.client.send(command)
      })
      await Promise.all(uploadPromises)

      return filesNames
    } catch (error) {
      throw error
    }
  }
}
