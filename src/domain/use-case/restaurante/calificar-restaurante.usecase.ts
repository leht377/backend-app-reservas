import {
  ActualizarCalificacionDto,
  ActualizarRestauranteDto,
  CalificarRestuaranteDto,
  CrearCalificacionDto,
  ObtenerCalificaionPorFiltroDto
} from '../../dtos'
import { RestauranteDetalladoEntity, RestauranteEntity } from '../../entities'
import { CustomErrors } from '../../errors'
import { CalificacionRepository, RestauranteRepository } from '../../repositories'

import { ObtenerRestaurantePorId } from './obtener-restaurante-por-id.usecase'

interface crearNuevaCalificacion {
  calificarRestuaranteDto: CalificarRestuaranteDto
  session: any
  calificacionActual: number
  cantidadResenasActual: number
  restaurante_id: string
}
interface ActualizarCalificacion {
  calificarRestuaranteDto: CalificarRestuaranteDto
  session: any
  calificacionVieja: number
  calificacionActual: number
  cantidadResenasActual: number
  restaurante_id: string
  cliente_id: string
}
export class CalificarRestuarante {
  constructor(
    private readonly restauranteRepository: RestauranteRepository,
    private readonly calificacionRepository: CalificacionRepository
  ) {}

  async execute(
    calificarRestuaranteDto: CalificarRestuaranteDto,
    session?: any
  ): Promise<RestauranteDetalladoEntity> {
    const { restaurante_id, cliente_id } = calificarRestuaranteDto
    const restaurante = await new ObtenerRestaurantePorId(this.restauranteRepository).execute(
      restaurante_id
    )

    const calificacionActual = restaurante.getCalificacion()
    const cantidadResenasActual = restaurante.getCantidadResenas()

    const obtenerCalificaionPorFiltroDto = ObtenerCalificaionPorFiltroDto.crear({
      restaurante_id,
      cliente_id
    })

    const calificacionExistente = await this.calificacionRepository.obtenerCalificacionPorFiltro(
      obtenerCalificaionPorFiltroDto
    )

    if (calificacionExistente) {
      const r = await this.actualizarCalificacion({
        calificacionActual: calificacionActual,
        calificacionVieja: calificacionExistente.getCalificacion(),
        calificarRestuaranteDto: calificarRestuaranteDto,
        cantidadResenasActual: cantidadResenasActual,
        cliente_id: cliente_id,
        restaurante_id: restaurante_id,
        session
      })
      return r!
    } else {
      const restauranteActualizado = await this.crearNuevaCalificacion({
        calificacionActual,
        calificarRestuaranteDto,
        cantidadResenasActual,
        restaurante_id,
        session
      })
      return restauranteActualizado
    }
  }

  private async actualizarCalificacion(
    params: ActualizarCalificacion
  ): Promise<RestauranteDetalladoEntity> {
    const nuevaCalificacionRequest = params.calificarRestuaranteDto.calificacion
    const calificacionVieja = params.calificacionVieja
    const calificacionActualRecalculada =
      params.calificacionActual - calificacionVieja + nuevaCalificacionRequest

    const actualizarCalificacionDto = ActualizarCalificacionDto.crear({
      calificacion: nuevaCalificacionRequest,
      cliente_id: params.cliente_id,
      restaurante_id: params.restaurante_id
    })

    await this.calificacionRepository.actualizar(actualizarCalificacionDto, {
      session: params.session
    })
    const dataActualizar = {
      calificacion: calificacionActualRecalculada,
      calificacion_promedio: calificacionActualRecalculada / params.cantidadResenasActual,
      id: params.restaurante_id,
      usuario_id: params.calificarRestuaranteDto.usuario_id
    }
    const actualizarRestauranteDto = ActualizarRestauranteDto.crear(dataActualizar)
    const restauranteActualizado = await this.restauranteRepository.actualizarRestaurante(
      actualizarRestauranteDto,
      { session: params.session }
    )
    return restauranteActualizado
  }

  private async crearNuevaCalificacion(
    params: crearNuevaCalificacion
  ): Promise<RestauranteDetalladoEntity> {
    const crearCalificacionDto = CrearCalificacionDto.crear(params.calificarRestuaranteDto)
    await this.calificacionRepository.crear(crearCalificacionDto, {
      session: params.session
    })

    const calificacionNueva =
      params.calificacionActual + params.calificarRestuaranteDto.calificacion
    const cantidad_resenasNueva = params.cantidadResenasActual + 1

    const dataActualizar = {
      calificacion: calificacionNueva,
      calificacion_promedio: calificacionNueva / cantidad_resenasNueva,
      cantidad_resenas: cantidad_resenasNueva,
      id: params.restaurante_id,
      usuario_id: params.calificarRestuaranteDto.usuario_id
    }
    const actualizarRestauranteDto = ActualizarRestauranteDto.crear(dataActualizar)
    const restauranteActualizado = await this.restauranteRepository.actualizarRestaurante(
      actualizarRestauranteDto,
      { session: params.session }
    )
    return restauranteActualizado
  }
}
