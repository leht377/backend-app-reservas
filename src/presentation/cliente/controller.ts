import { NextFunction, Request, Response } from 'express'
import {
  AgregarFavorito,
  AgregarFavoritoDto,
  ClienteRepository,
  CustomErrors,
  EliminarFavoritoDto,
  ObtenerClientePorId,
  ObtenerReservasCliente,
  ObtnerReservaDto,
  ObtnerRestaurantesFavoritos,
  ReservaRepository,
  eliminarFavorito
} from '../../domain'
import { UsuarioRol } from '../../common/utils'

export class ClienteController {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly reservaRepository: ReservaRepository
  ) {}
  obtenerClientePorId = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id
    try {
      const cliente = await new ObtenerClientePorId(this.clienteRepository).execute(id)
      res.json(cliente)
    } catch (error) {
      next(error)
    }
  }

  obtenerReservas = async (req: Request, res: Response, next: NextFunction) => {
    const usuario = req.body.usuarioToken
    const cliente_id = req.params?.id_cliente
    const usuario_rol_id = usuario?.usuario_rol_id
    const { query = {} } = req

    try {
      if (cliente_id?.toString() != usuario_rol_id?.toString())
        throw CustomErrors.badRequest(
          'El cliente no se encuentra autorizado para consultar esta informacion'
        )

      const obtenerReservasDto = ObtnerReservaDto.crear({ cliente_id, query })
      const reservas = await new ObtenerReservasCliente(
        this.reservaRepository,
        this.clienteRepository
      ).execute(obtenerReservasDto)

      res.json(reservas)
    } catch (error) {
      next(error)
    }
  }

  agregarRestauranteFavorito = async (req: Request, res: Response, next: NextFunction) => {
    const cliente_id = req.params?.id_cliente
    const restaurante_id = req.params?.id_restaurante

    const cliente_id_token = req.body?.usuarioToken?.usuario_rol_id

    try {
      if (cliente_id?.toString() != cliente_id_token?.toString()) {
        throw CustomErrors.badRequest('No cuentas con permiso para agregar favorito a este cliente')
      }
      const agregarFavoritoDto = AgregarFavoritoDto.crear({ cliente_id, restaurante_id })
      const cliente = await new AgregarFavorito(this.clienteRepository).execute(agregarFavoritoDto)
      res.json(cliente)
    } catch (error) {
      next(error)
    }
  }

  eliminarRestauranteFavorito = async (req: Request, res: Response, next: NextFunction) => {
    const cliente_id = req.params?.id_cliente
    const restaurante_id = req.params?.id_restaurante
    const cliente_id_token = req.body?.usuarioToken?.usuario_rol_id

    try {
      if (cliente_id?.toString() != cliente_id_token?.toString()) {
        throw CustomErrors.badRequest('No cuentas con permiso para agregar favorito a este cliente')
      }
      const eliminarFavoritoDto = EliminarFavoritoDto.crear({ cliente_id, restaurante_id })
      const cliente = await new eliminarFavorito(this.clienteRepository).execute(
        eliminarFavoritoDto
      )
      res.json(cliente)
    } catch (error) {
      next(error)
    }
  }

  obtenerRestaurantesFavoritos = async (req: Request, res: Response, next: NextFunction) => {
    const cliente_id = req.params?.id_cliente
    const cliente_id_token = req.body?.usuarioToken?.usuario_rol_id

    try {
      if (cliente_id?.toString() != cliente_id_token?.toString()) {
        throw CustomErrors.badRequest('No cuentas con permiso consultar esta información')
      }

      const restaurantes = await new ObtnerRestaurantesFavoritos(this.clienteRepository).execute(
        cliente_id
      )

      res.json(restaurantes)
    } catch (error) {
      next(error)
    }
  }
}
