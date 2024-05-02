import mongoose from 'mongoose'
import { HashtagModel } from '../../data'
import { CustomErrors, HashtagEntity, HashtagRepository, RegistrarHashtagDto } from '../../domain'
import { HashtagMapper } from '../mappers'

export class MongoHashtagDatasourceImpl implements HashtagRepository {
  async obtenerHashtag(): Promise<HashtagEntity[] | []> {
    const hashtags = await HashtagModel.find({}).lean()
    return hashtags?.map((hashtag) => HashtagMapper.HashtagEntityFromObject(hashtag))
  }
  async registrarHashtag(registrarHashtagDto: RegistrarHashtagDto): Promise<HashtagEntity> {
    try {
      const { nombre } = registrarHashtagDto
      const hashtag = new HashtagModel({ nombre: nombre })
      const hashtagGuardado = await hashtag.save()
      return HashtagMapper.HashtagEntityFromObject(hashtagGuardado?.toObject())
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
}
