import { HashtagEntity } from '../../entities'
import { HashtagRepository } from '../../repositories'

export class ObtenerHashtags {
  constructor(private readonly hashtagRepository: HashtagRepository) {}

  async execute(): Promise<HashtagEntity[] | []> {
    const hashtags = await this.hashtagRepository.obtenerHashtag()
    return hashtags
  }
}
