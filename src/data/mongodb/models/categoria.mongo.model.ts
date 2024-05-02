import mongoose, { Schema, Document, Types } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
interface CategoriaDocument extends Document {
  nombre: string
}

const categoriaSchema = new Schema<CategoriaDocument>({
  nombre: { type: String, required: true, minlength: 5, maxlength: 20, unique: true }
})
categoriaSchema.plugin(uniqueValidator)
const CategoriaModel = mongoose.model<CategoriaDocument>('Categoria', categoriaSchema, 'categorias')

export { CategoriaModel, CategoriaDocument }
