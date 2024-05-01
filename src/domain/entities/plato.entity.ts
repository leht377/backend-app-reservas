export class PlatoEntity {
  constructor(
    private readonly id: string,
    private categorias: string[],
    private hastags: string[],
    private nombre: string,
    private descripcion: string,
    private foto_principal: string,
    private fotos_secundarias: string[]
  ) {}

  get getId(): string {
    return this.id
  }

  get getCategorias(): string[] {
    return this.categorias
  }

  get getHastags(): string[] {
    return this.hastags
  }

  get getNombre(): string {
    return this.nombre
  }

  get getDescripcion(): string {
    return this.descripcion
  }

  get getFotoPrincipal(): string {
    return this.foto_principal
  }

  get getFotosSecundarias(): string[] {
    return this.fotos_secundarias
  }
}
