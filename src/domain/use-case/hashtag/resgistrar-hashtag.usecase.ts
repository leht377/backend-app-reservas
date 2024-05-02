import { RegistrarHashtagDto } from '../../dtos'
import { HashtagEntity } from '../../entities'
import { HashtagRepository } from '../../repositories'

export class RegistrarHashtag {
  constructor(private readonly hashtagRepository: HashtagRepository) {}

  async execute(registrarHashtagDto: RegistrarHashtagDto): Promise<HashtagEntity> {
    const hashtag = await this.hashtagRepository.registrarHashtag(registrarHashtagDto)
    return hashtag
  }
}
