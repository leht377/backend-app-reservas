import mongoose, { Schema, Document } from 'mongoose'
import { UsuarioRol } from '../../../common/utils'
import uniqueValidator from 'mongoose-unique-validator'
interface UsuarioDocument extends Document {
  correo: string
  contrasena: string
  rol: UsuarioRol
}

const usuarioSchema = new Schema<UsuarioDocument>({
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contrasena: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: Object.values(UsuarioRol),
    required: true
  }
})
usuarioSchema.plugin(uniqueValidator)
const UsuarioModel = mongoose.model<UsuarioDocument>('Usuario', usuarioSchema, 'usuarios')

export { UsuarioModel, UsuarioDocument }
