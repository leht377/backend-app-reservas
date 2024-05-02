import { CategoriaEntity } from '../../entities'
import { CategoriaRepository } from '../../repositories'

export class ObtenerCategorias {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}
  async execute(): Promise<CategoriaEntity[] | []> {
    const categoria = await this.categoriaRepository.obtener()
    return categoria
  }
}
