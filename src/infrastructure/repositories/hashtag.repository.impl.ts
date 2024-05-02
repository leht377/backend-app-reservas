import {
  HashtagDataSource,
  HashtagEntity,
  HashtagRepository,
  RegistrarHashtagDto
} from '../../domain'

export class MongoHashtagRepository implements HashtagRepository {
  constructor(private readonly hashtagDatasource: HashtagDataSource) {}
  obtenerHashtag(): Promise<[] | HashtagEntity[]> {
    return this.hashtagDatasource.obtenerHashtag()
  }
  registrarHashtag(registrarHashtagDto: RegistrarHashtagDto): Promise<HashtagEntity> {
    return this.hashtagDatasource.registrarHashtag(registrarHashtagDto)
  }
}
