import mongoose, { ClientSession, PaginateOptions, UpdateQuery, isValidObjectId } from 'mongoose'
import {
  ActualizarRestauranteDto,
  CustomErrors,
  DeleteFotoIntalacionDto,
  OptionsActualizarRestaurante,
  OptionsRegistrarRestaurante,
  RestauranteDataSource,
  RestauranteDetalladoEntity,
  RestauranteEntity,
  RestaurantesConPaginacion,
  ResultadoPaginado,
  UploadFotoIntalacionDto
} from '../../domain'
import { RegistrarRestauranteDto } from '../../domain/dtos/restaurante/registrar-restaurante.dto'
import { RestauranteDocument, RestuaranteModelo } from '../../data'
import { RestauranteMapper } from '../mappers'
import { ObtenerRestauranteDto } from '../../domain/dtos/restaurante/obtener-restaurantes.dto'

export class MongoRestauranteDataSourceImpl implements RestauranteDataSource {
  async deletefotoInstalacion(
    deleteFotoIntalacionDto: DeleteFotoIntalacionDto
  ): Promise<RestauranteDetalladoEntity> {
    const { foto_id, restaurante_id } = deleteFotoIntalacionDto
    if (!isValidObjectId(restaurante_id))
      throw CustomErrors.badRequest('El id del restaurante no es valido')

    try {
      let restauranteActualizado
      const data: UpdateQuery<RestauranteDocument> = {
        $pull: { url_fotos_instalacciones: { _id: foto_id } }
      }
      const options = { new: true, runValidators: true }

      restauranteActualizado = await RestuaranteModelo.findByIdAndUpdate(
        restaurante_id,
        data,
        options
      ).populate('usuario_id')

      if (!restauranteActualizado)
        throw CustomErrors.badRequest(
          `No existe ningun restaurante identificado con el id: ${restaurante_id}`
        )

      return RestauranteMapper.RestauranteDetalladoEntityFromObject(
        restauranteActualizado?.toObject()
      )
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
  async uploadFotoInstalacion(
    uploadFotoIntalacionDto: UploadFotoIntalacionDto
  ): Promise<RestauranteDetalladoEntity> {
    const { url_foto_instalacion, restaurante_id } = uploadFotoIntalacionDto
    if (!isValidObjectId(restaurante_id))
      throw CustomErrors.badRequest('El id del restaurante no es valido')

    try {
      let restauranteActualizado
      const data: UpdateQuery<RestauranteDocument> = {
        $push: { url_fotos_instalacciones: { uri: url_foto_instalacion } }
      }
      const options = { new: true, runValidators: true }

      restauranteActualizado = await RestuaranteModelo.findByIdAndUpdate(
        restaurante_id,
        data,
        options
      ).populate('usuario_id')

      if (!restauranteActualizado)
        throw CustomErrors.badRequest(
          `No existe ningun restaurante identificado con el id: ${restaurante_id}`
        )

      return RestauranteMapper.RestauranteDetalladoEntityFromObject(
        restauranteActualizado?.toObject()
      )
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
  async actualizarRestaurante(
    actualizarRestauranteDto: ActualizarRestauranteDto,
    options?: OptionsActualizarRestaurante
  ): Promise<RestauranteDetalladoEntity> {
    const {
      id,
      usuario_id,
      descripcion,
      dias_servicios,
      foto_restaurante,
      horas_servicios,
      localizacion,
      menu_id,
      nombre,
      calificacion,
      cantidad_resenas,
      calificacion_promedio
    } = actualizarRestauranteDto

    if (!isValidObjectId(id)) throw CustomErrors.badRequest('El id del restaurante no es valido')
    try {
      let session: ClientSession | undefined
      session = options?.session

      const data: UpdateQuery<RestauranteDocument> = {
        descripcion: descripcion,
        dias_servicio: dias_servicios,
        url_fotos_restaurantes: foto_restaurante,
        horas_servicio: horas_servicios,
        locacion: localizacion,
        nombre: nombre,
        menu_id: menu_id,
        calificacion: calificacion,
        cantidad_resenas: cantidad_resenas,
        calificacion_promedio: calificacion_promedio
      }
      let restauranteActualizado

      restauranteActualizado = await RestuaranteModelo.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        session: session
      }).populate('usuario_id')

      if (!restauranteActualizado)
        throw CustomErrors.badRequest(`No existe ningun restaurante identificado con el id: ${id}`)

      let sePuedeHacerVisible = false

      if (
        restauranteActualizado?.descripcion &&
        restauranteActualizado?.dias_servicio &&
        restauranteActualizado?.dias_servicio?.length > 0 &&
        restauranteActualizado?.url_fotos_restaurantes &&
        restauranteActualizado?.url_fotos_restaurantes?.length > 0 &&
        restauranteActualizado?.horas_servicio &&
        restauranteActualizado?.horas_servicio?.length > 0
      )
        sePuedeHacerVisible = true

      if (sePuedeHacerVisible) {
        restauranteActualizado = await RestuaranteModelo.findByIdAndUpdate(
          id,
          { visible: true },
          {
            new: true,
            runValidators: true,
            session: session
          }
        ).populate('usuario_id')
      }

      return RestauranteMapper.RestauranteDetalladoEntityFromObject(
        restauranteActualizado?.toObject()!!
      )
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }

  async obtenerRestaurantes(
    obtenerRestauranteDto: ObtenerRestauranteDto
  ): Promise<RestaurantesConPaginacion> {
    const options: PaginateOptions = {
      page: obtenerRestauranteDto.page,
      limit: obtenerRestauranteDto.limit,
      populate: 'usuario_id'
    }
    const nombreBusqueda = obtenerRestauranteDto.nombre
      ? new RegExp(obtenerRestauranteDto.nombre, 'i')
      : null

    // Construir la consulta
    const consulta: Record<string, any> = { visible: true }
    if (nombreBusqueda) {
      consulta.nombre = nombreBusqueda
    }
    // const documentos = await RestuaranteModelo.paginate({ visible: true }, options)
    const documentos = await RestuaranteModelo.paginate(consulta, options)
    const { docs, ...rest } = documentos
    const restaurantes: RestauranteDocument[] = docs

    let restaurantesEntities = restaurantes.map((restaurante) =>
      RestauranteMapper.RestauranteDetalladoEntityFromObject(restaurante?.toObject())
    )
    const pageInformation: ResultadoPaginado = {
      hasNextPage: rest?.hasNextPage,
      hasPrevPage: rest?.hasPrevPage,
      limit: rest?.limit,
      nextPage: rest?.nextPage,
      page: rest?.page,
      pagingCounter: rest?.pagingCounter,
      prevPage: rest?.prevPage,
      totalDocs: rest?.totalDocs,
      totalPages: rest?.totalPages
    }

    return { restaurantes: restaurantesEntities, paginacion: pageInformation }
  }

  async obtenerRestaurantePorUsuarioId(id: string): Promise<RestauranteDetalladoEntity | null> {
    if (!isValidObjectId(id)) throw CustomErrors.badRequest(`El id:${id} no es valido`)

    const restaurante: RestauranteDocument | null = await RestuaranteModelo.findOne({
      usuario_id: id
    }).populate('usuario_id')

    if (!restaurante) return null
    return RestauranteMapper.RestauranteDetalladoEntityFromObject(restaurante.toObject())
  }

  async obtenerRestaurantePorId(id: string): Promise<RestauranteDetalladoEntity> {
    if (!isValidObjectId(id)) throw CustomErrors.badRequest(`El id:${id} no es valido`)

    const restaurante: RestauranteDocument | null = await RestuaranteModelo.findById(id).populate(
      'usuario_id'
    )

    if (!restaurante)
      throw CustomErrors.badRequest(`No existe ningun restaurante identificado con el id ${id}`)
    return RestauranteMapper.RestauranteDetalladoEntityFromObject(restaurante.toObject())
  }

  async registrarRestaurante(
    registrarRestauranteDto: RegistrarRestauranteDto,
    options: OptionsRegistrarRestaurante
  ): Promise<RestauranteEntity> {
    try {
      let session: ClientSession | undefined
      session = options?.session

      const restaurante = new RestuaranteModelo(registrarRestauranteDto)
      const restauranteGuardado: RestauranteDocument = await restaurante.save({ session })

      return RestauranteMapper.RestauranteEntityFromObject(restauranteGuardado.toObject())
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
}
