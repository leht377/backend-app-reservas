import {
  CategoriaEntity,
  CategoriaRepository,
  CrearCategoriaDto,
  EditarCategoriaDto,
  EliminarCategoriaDto,
  ObtenerCategoriaPorIdDto
} from '../../domain'

export class CategoriaRepositoryImpl implements CategoriaRepository {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}
  crear(crearCategoriaDto: CrearCategoriaDto): Promise<CategoriaEntity> {
    return this.categoriaRepository.crear(crearCategoriaDto)
  }
  actualizar(editarCategoriaDto: EditarCategoriaDto): Promise<CategoriaEntity> {
    throw new Error('Method not implemented.')
  }
  eliminar(eliminarCategoriaDto: EliminarCategoriaDto): Promise<CategoriaEntity> {
    throw new Error('Method not implemented.')
  }
  obtenerPorId(obtenerCategoriaPorIdDto: ObtenerCategoriaPorIdDto): Promise<CategoriaEntity> {
    throw new Error('Method not implemented.')
  }
}
