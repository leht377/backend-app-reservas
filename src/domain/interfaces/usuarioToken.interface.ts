export interface UserToken {
  token: string
  usuario: {
    id: string
    correo: string
    rol: string
  }
}

export interface TokenPayload {
  correo: string
  rol: string
  usuario_id: string
  id: string
}
