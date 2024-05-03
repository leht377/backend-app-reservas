import { AgregarPlatoDto } from '../../dtos'
import { MenuRepository } from '../../repositories'

export class AgregarPlato {
  constructor(private readonly menuRepository: MenuRepository) {}

  async execute(agregarPlatoDto: AgregarPlatoDto, session?: any): Promise<void> {
    await this.menuRepository.agregarPlatoMenu(agregarPlatoDto, { session })
  }
}
