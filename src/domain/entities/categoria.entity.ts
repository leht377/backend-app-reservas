export class CategoriaEntity {
  constructor(private readonly id: string, private readonly nombre: string) {}

  getId(): string {
    return this.id
  }

  getNombre(): string {
    return this.nombre
  }
}
