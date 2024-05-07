import { RestauranteEntity } from './restaurante.entity'

export class RestauranteDetalladoEntity extends RestauranteEntity {
  private rol: string
  private correo: string

  constructor(
    id: string,
    usuario_id: string,
    nombre: string,
    visible: boolean,
    descripcion: string,
    calificacion: number,
    cantidad_resenas: number,
    locacion: string,
    horas_servicio: Date[],
    dias_servicio: Date[],
    url_foto_restaurante: string,
    url_fotos_instalaciones: string[],
    fechas_bloqueadas_reservas: Date[],
    rol: string,
    correo: string,
    calificacion_promedio: number,
    menu_id?: string
  ) {
    super(
      id,
      usuario_id,
      nombre,
      visible,
      descripcion,
      calificacion,
      cantidad_resenas,
      locacion,
      horas_servicio,
      dias_servicio,
      url_foto_restaurante,
      url_fotos_instalaciones,
      fechas_bloqueadas_reservas,
      calificacion_promedio,
      menu_id
    )
    this.rol = rol
    this.correo = correo
  }

  getRol(): string {
    return this.rol
  }

  getCorreo(): string {
    return this.correo
  }
}
