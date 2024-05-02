import { RegistrarHashtagDto } from '../dtos'
import { HashtagEntity } from '../entities'

export abstract class HashtagRepository {
  abstract registrarHashtag(registrarHashtagDto: RegistrarHashtagDto): Promise<HashtagEntity>
  abstract obtenerHashtag(): Promise<HashtagEntity[] | []>
}
