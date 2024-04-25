import mongoose, { Types, Schema, Document } from 'mongoose'

interface NotificacionTokenDocument extends Document {
  token: string
  usuario_id: Types.ObjectId
}

const notificacionTokenSchema = new Schema<NotificacionTokenDocument>({
  usuario_id: {
    type: Schema.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
  }
})

const NotificacionTokenModel = mongoose.model<NotificacionTokenDocument>(
  'NotificacionToken',
  notificacionTokenSchema,
  'notificacionToken'
)

export { NotificacionTokenDocument, NotificacionTokenModel }
