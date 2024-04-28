export class ClienteEntity {
  constructor(
    private readonly id: string,
    private usuario_id: string,
    private nombre: string,
    private apellido: string,
    private restaurantes_favoritos_ids: string[]
  ) {}

  getId(): string {
    return this.id
  }

  getUsuarioId(): string {
    return this.usuario_id
  }

  getNombre(): string {
    return this.nombre
  }

  getApellido(): string {
    return this.apellido
  }

  getRestaurantesFavoritosIds(): string[] {
    return this.restaurantes_favoritos_ids
  }
}
