import {
  CrearCategoriaDto,
  EditarCategoriaDto,
  EliminarCategoriaDto,
  ObtenerCategoriaPorIdDto
} from '../dtos'
import { CategoriaEntity } from '../entities'

export abstract class CategoriaDatasource {
  abstract crear(crearCategoriaDto: CrearCategoriaDto): Promise<CategoriaEntity>
  abstract obtener(): Promise<[] | CategoriaEntity[]>
  abstract actualizar(editarCategoriaDto: EditarCategoriaDto): Promise<CategoriaEntity>
  abstract eliminar(eliminarCategoriaDto: EliminarCategoriaDto): Promise<CategoriaEntity>
  abstract obtenerPorId(
    obtenerCategoriaPorIdDto: ObtenerCategoriaPorIdDto
  ): Promise<CategoriaEntity>
}
