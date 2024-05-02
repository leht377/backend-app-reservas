import mongoose from 'mongoose'
import {
  CategoriaDatasource,
  CategoriaEntity,
  CrearCategoriaDto,
  CustomErrors,
  EditarCategoriaDto,
  EliminarCategoriaDto,
  ObtenerCategoriaPorIdDto
} from '../../domain'
import { CategoriaModel } from '../../data'
import { CategoriaMapper } from '../mappers'

export class MongoCategoriaDatasourceImpl implements CategoriaDatasource {
  async crear(crearCategoriaDto: CrearCategoriaDto): Promise<CategoriaEntity> {
    try {
      const categoria = new CategoriaModel({ nombre: crearCategoriaDto.nombre })
      const categoriaGuardada = await categoria.save()

      return CategoriaMapper.CategoriaEntityFromObject(categoriaGuardada?.toObject())
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
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
