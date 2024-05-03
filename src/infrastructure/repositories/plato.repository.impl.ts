import { OptiosRegistrarPlato, PlatoDatasorce, PlatoEntity, PlatoRepository } from '../../domain'
import { RegistrarPlatoDto } from '../../domain/dtos/plato'

export class PlatoRepositoryImpl implements PlatoRepository {
  constructor(private readonly platoDatasource: PlatoDatasorce) {}
  registrar(
    registrarPlatoDto: RegistrarPlatoDto,
    options?: OptiosRegistrarPlato
  ): Promise<PlatoEntity> {
    return this.platoDatasource.registrar(registrarPlatoDto, options)
  }
}
