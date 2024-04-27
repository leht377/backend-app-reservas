export class ClienteEntity {
  constructor(
    public id: string,
    public usuario_id: string,
    public nombre: string,
    public apellido: string,
    public restaurantes_favoritos_ids: string[]
  ) {}
}
