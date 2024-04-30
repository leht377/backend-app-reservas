export class UsuarioEntity {
  constructor(
    private readonly id: string,
    private rol: string,
    private correo: string,
    private readonly constrasenaHash?: string
  ) {}
  getId(): string {
    return this.id
  }

  getRol(): string {
    return this.rol
  }

  getCorreo(): string {
    return this.correo
  }

  getContrasenaHash(): string | undefined {
    return this.constrasenaHash
  }
}
