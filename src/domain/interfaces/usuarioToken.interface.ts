export interface UserToken {
  token: string
  refreshToken: string
  usuario: {
    id: string
    correo: string
    rol: string
    rol_usuario_id: string
  }
}

export interface TokenPayload {
  correo: string
  rol: string
  usuario_id: string
  id: string
}
