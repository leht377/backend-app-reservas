import mongoose, { Schema, Document, Types } from 'mongoose'

interface CategoriaDocument extends Document {
  nombre: string
}

const categoriaSchema = new Schema<CategoriaDocument>({
  nombre: { type: String, required: true, minlength: 5, maxlength: 20 }
})

const CategoriaModel = mongoose.model(
  'Categoria',
  categoriaSchema,
  'categorias'
)

export { CategoriaModel, CategoriaDocument }
