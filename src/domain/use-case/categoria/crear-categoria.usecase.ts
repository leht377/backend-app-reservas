import { CrearCategoriaDto } from '../../dtos'
import { CategoriaEntity } from '../../entities'
import { CategoriaRepository } from '../../repositories'

export class CrearCategoria {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}
  async execute(crearCategoriaDto: CrearCategoriaDto): Promise<CategoriaEntity> {
    const categoria = await this.categoriaRepository.crear(crearCategoriaDto)
    return categoria
  }
}
