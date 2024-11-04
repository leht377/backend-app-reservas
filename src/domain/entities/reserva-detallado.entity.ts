import { EstadoReserva } from '../../common/utils'
import { PlatoEntity } from './plato.entity'

export class ReservaDetalladoEntity {
  constructor(
    private readonly id: string,
    private readonly cliente_id: string,
    private readonly nombre_cliente: string,
    private readonly apellido_cliente: string,
    private readonly nombre_restaurante: string,
    private readonly locacion_restaurante: string,
    private readonly restaurante_id: string,
    private readonly nombre_reservante: string,
    private readonly cantidad_personas: string,
    private readonly estado: EstadoReserva,
    private readonly platos: PlatoEntity[],
    private readonly fecha_reserva: Date,
    private readonly hora_reserva: string,
    private readonly cod_ingreso?: string
  ) {}

  getId(): string {
    return this.id
  }

  getClienteId(): string {
    return this.cliente_id
  }
  
  getPlatos(): PlatoEntity[] {
    return this.platos
  }

  getNombreCliente(): string {
    return this.nombre_cliente
  }

  getApellidoCliente(): string {
    return this.apellido_cliente
  }

  getNombreRestaurante(): string {
    return this.nombre_restaurante
  }

  getLocacionRestaurante(): string {
    return this.locacion_restaurante
  }

  getRestauranteId(): string {
    return this.restaurante_id
  }

  getNombreReservante(): string {
    return this.nombre_reservante
  }

  getCantidadPersonas(): string {
    return this.cantidad_personas
  }

  getEstado(): EstadoReserva {
    return this.estado
  }

  getFechaReserva(): Date {
    return this.fecha_reserva
  }

  getHoraReserva(): string {
    return this.hora_reserva
  }

  getCodIngreso(): string | undefined {
    return this.cod_ingreso
  }
}
