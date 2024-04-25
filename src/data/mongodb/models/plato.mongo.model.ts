import mongoose, { Schema, Document, Types } from 'mongoose'

interface PlatoDocument extends Document {
  categoria_id: Types.ObjectId[]
  hashtag_id: Types.ObjectId[]
  nombre: string
  descripcion: string
  url_foto_principal: string
  url_fotos_secundarias: string[]
}

const platoSchema = new Schema<PlatoDocument>({
  categoria_id: {
    type: [{ type: Schema.ObjectId, ref: 'Categoria', required: true }],
    required: true
  },
  hashtag_id: {
    type: [{ type: Schema.ObjectId, ref: 'Hashtag', required: true }],
    required: true
  },
  nombre: { type: String, required: true, minlength: 5 },
  descripcion: { type: String, required: true, minlength: 100, maxlength: 200 },
  url_foto_principal: { type: String, required: true },
  url_fotos_secundarias: { type: [{ type: String }] }
})

const PlatoModel = mongoose.model<PlatoDocument>('Plato', platoSchema, 'platos')

export { PlatoModel, PlatoDocument }
