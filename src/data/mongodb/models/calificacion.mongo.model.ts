import mongoose, { Schema, Document, Types } from 'mongoose'

interface CalificacionDocument extends Document {
  cliente_id: Types.ObjectId
  restaurante_id: Types.ObjectId
  calificacion: Number
}

const calificacionSchema = new Schema<CalificacionDocument>({
  cliente_id: { type: Schema.ObjectId, required: true, ref: 'Cliente' },
  restaurante_id: { type: Schema.ObjectId, required: true, ref: 'Restaurante' },
  calificacion: { type: Number, required: true }
})

const CalificacionModel = mongoose.model<CalificacionDocument>(
  'Califciacion',
  calificacionSchema,
  'calificaciones'
)

export { CalificacionDocument, CalificacionModel }
