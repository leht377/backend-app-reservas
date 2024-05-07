export class RestauranteEntity {
  constructor(
    private readonly id: string,
    private readonly usuario_id: string,
    private nombre: string,
    private visible: boolean,
    private descripcion: string,
    private calificacion: number,
    private cantidad_resenas: number,
    private locacion: string,
    private horas_servicio: Date[],
    private dias_servicio: Date[],
    private url_foto_restaurante: string,
    private url_fotos_instalaciones: string[],
    private fechas_bloqueadas_reservas: Date[],
    private readonly calificacion_promedio: number,
    private readonly menu_id?: string
  ) {}

  getId(): string {
    return this.id
  }

  getCalificacionPromedio(): number {
    return this.calificacion_promedio
  }
  getVisible(): boolean {
    return this.visible
  }

  getUsuarioId(): string {
    return this.usuario_id
  }

  getMenuId(): string | undefined {
    return this.menu_id
  }

  getNombre(): string {
    return this.nombre
  }

  getDescripcion(): string {
    return this.descripcion
  }

  getCalificacion(): number {
    return this.calificacion
  }

  getCantidadResenas(): number {
    return this.cantidad_resenas
  }

  getLocacion(): string {
    return this.locacion
  }

  getHorasServicio(): Date[] {
    return this.horas_servicio
  }

  getDiasServicio(): Date[] {
    return this.dias_servicio
  }

  getUrlFotoRestaurante(): string {
    return this.url_foto_restaurante
  }

  getUrlFotosInstalaciones(): string[] {
    return this.url_fotos_instalaciones
  }

  getFechasBloqueadasReservas(): Date[] {
    return this.fechas_bloqueadas_reservas
  }
}
