import mongoose, { ClientSession, isValidObjectId } from 'mongoose'
import { CalificacionModel } from '../../data'
import {
  CalificacionDatasource,
  CalificacionEntity,
  CustomErrors,
  OptiosActualizarCalificacion,
  OptiosRegistrarCalificacion
} from '../../domain'
import {
  ActualizarCalificacionDto,
  CrearCalificacionDto,
  ObtenerCalificaionPorFiltroDto
} from '../../domain/dtos/calificacion'
import { CalificacionMapper } from '../mappers'

export class MongoCalificacionDatasourceImpl implements CalificacionDatasource {
  async crear(
    crearCalificacionDto: CrearCalificacionDto,
    options?: OptiosRegistrarCalificacion
  ): Promise<CalificacionEntity> {
    try {
      let session: ClientSession | undefined
      session = options?.session
      const { calificacion, cliente_id, restaurante_id } = crearCalificacionDto

      if (!isValidObjectId(restaurante_id))
        throw CustomErrors.badRequest('El restaurante_id no es un id valido')
      if (!isValidObjectId(cliente_id))
        throw CustomErrors.badRequest('El cliente_id no es un id valido')

      const calificacionM = new CalificacionModel({ calificacion, cliente_id, restaurante_id })
      const calificacionGuardad = await calificacionM.save({ session: session })
      return CalificacionMapper.CalificacionEntityFromObject(calificacionGuardad?.toObject())
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
  async actualizar(
    actualizarCalificacionDto: ActualizarCalificacionDto,
    options?: OptiosActualizarCalificacion
  ): Promise<CalificacionEntity> {
    try {
      let session: ClientSession | undefined
      session = options?.session

      const { calificacion, cliente_id, restaurante_id } = actualizarCalificacionDto

      if (!isValidObjectId(restaurante_id))
        throw CustomErrors.badRequest('El restaurante_id no es un id valido')
      if (!isValidObjectId(cliente_id))
        throw CustomErrors.badRequest('El cliente_id no es un id valido')

      const calificacionActualizada = await CalificacionModel.findOneAndUpdate(
        { cliente_id, restaurante_id },
        { calificacion },
        { session, runValidators: true, new: true }
      )
      if (!calificacionActualizada)
        throw CustomErrors.badRequest(
          'No se pudo actualizar ya que no se encontro ninguna calificacion asociada al cliente'
        )

      return CalificacionMapper.CalificacionEntityFromObject(calificacionActualizada?.toObject())
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
  async obtenerCalificacionPorFiltro(
    obtenerCalificaionPorFiltroDto: ObtenerCalificaionPorFiltroDto
  ): Promise<CalificacionEntity | null> {
    const { cliente_id, restaurante_id } = obtenerCalificaionPorFiltroDto

    const calificacion = await CalificacionModel.findOne({
      cliente_id: cliente_id,
      restaurante_id: restaurante_id
    })

    if (!calificacion) return null
    return CalificacionMapper.CalificacionEntityFromObject(calificacion?.toObject())
  }
}
