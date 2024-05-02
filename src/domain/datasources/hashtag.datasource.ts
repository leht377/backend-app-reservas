import { RegistrarHashtagDto } from '../dtos'
import { HashtagEntity } from '../entities'

export abstract class HashtagDataSource {
  abstract registrarHashtag(registrarHashtagDto: RegistrarHashtagDto): Promise<HashtagEntity>
  abstract obtenerHashtag(): Promise<HashtagEntity[] | []>
}
