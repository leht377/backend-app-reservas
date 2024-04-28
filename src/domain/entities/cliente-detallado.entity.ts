import { ClienteEntity } from './cliente.entity'

export class ClienteDetalladoEntity extends ClienteEntity {
  private rol: string
  private correo: string

  constructor(
    id: string,
    usuario_id: string,
    nombre: string,
    apellido: string,
    restaurantes_favoritos_ids: string[],
    rol: string,
    correo: string
  ) {
    super(id, usuario_id, nombre, apellido, restaurantes_favoritos_ids)
    this.correo = correo
    this.rol = rol
  }

  get getRol(): string {
    return this.rol
  }

  get getCorreo(): string {
    return this.correo
  }
}
