import { EstadoReserva } from '../../common/utils'

export class ReservaEntity {
  constructor(
    private readonly id: string,
    private readonly cliente_id: string,
    private readonly platos_id: string[],
    private readonly restaurante_id: string,
    private readonly nombre_reservante: string,
    private readonly cantidad_personas: string,
    private readonly estado: EstadoReserva,
    private readonly fecha_reserva: Date,
    private readonly hora_reserva: string,
    private readonly cod_ingreso?: string,
    private readonly motivo_de_rechazon?: string 
  ) {}

  getId(): string {
    return this.id
  }
  getRestauranteId(): string {
    return this.restaurante_id
  }
  
  getMotivoRechazon(): string | undefined{
    return this.motivo_de_rechazon
  }

  getPlatoId(): string[] {
    return this.platos_id
  }

  getClienteId(): string {
    return this.cliente_id
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
