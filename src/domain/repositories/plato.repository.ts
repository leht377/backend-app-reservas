import { RegistrarPlatoDto } from '../dtos/plato'
import { PlatoEntity } from '../entities'
import { OptiosRegistrarPlato } from '../interfaces'

export abstract class PlatoRepository {
  abstract registrar(
    registrarPlatoDto: RegistrarPlatoDto,
    options?: OptiosRegistrarPlato
  ): Promise<PlatoEntity>
}
