import mongoose, { Schema, Document } from 'mongoose'
import { UsuarioRol } from '../../../common/utils'

interface UsuarioDocument extends Document {
  usuario: string
  contrasena: string
  rol: UsuarioRol
}

const usuarioSchema = new Schema<UsuarioDocument>({
  usuario: {
    type: String,
    required: true
  },
  contrasena: {
    type: String,
    required: true,
    unique: true
  },
  rol: {
    type: String,
    enum: Object.values(UsuarioRol),
    required: true
  }
})

const UsuarioModel = mongoose.model<UsuarioDocument>(
  'Usuario',
  usuarioSchema,
  'usuarios'
)

export { UsuarioModel, UsuarioDocument }
