export class CalificacionEntity {
  constructor(
    private readonly id: string,
    private readonly calificacion: number,
    private readonly cliente_id: string,
    private readonly restaurante_id: string
  ) {}

  getId(): string {
    return this.id
  }

  getCalificacion(): number {
    return this.calificacion
  }

  getClienteId(): string {
    return this.cliente_id
  }

  getRestauranteId(): string {
    return this.restaurante_id
  }
}
