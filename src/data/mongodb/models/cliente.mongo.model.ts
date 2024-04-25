import mongoose, { Schema, Document, Types } from 'mongoose'

interface ClienteDocument extends Document {
  usuario_id: Types.ObjectId
  nombre: string
  apellido: string
  restaurantes_favoritos_ids: Types.ObjectId[]
}

const clienteSchema = new Schema<ClienteDocument>({
  usuario_id: { type: Schema.Types.ObjectId, required: true, ref: 'Usuario' },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  restaurantes_favoritos_ids: [
    { type: Schema.Types.ObjectId, ref: 'Restaurante' }
  ]
})

const ClienteModel = mongoose.model<ClienteDocument>(
  'Cliente',
  clienteSchema,
  'clientes'
)

export { ClienteModel, ClienteDocument }
