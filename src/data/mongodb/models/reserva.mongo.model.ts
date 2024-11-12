import mongoose, { Document, Schema, Types } from 'mongoose'
import { EstadoReserva } from '../../../common/utils'

interface ReservaDocument extends Document {
  restaurante_id: Types.ObjectId
  cliente_id: Types.ObjectId
  platos_id: Types.ObjectId[]
  nombre_reservante: string
  cantidad_personas: number
  motivo_de_rechazon: string | null
  estado: EstadoReserva
  fecha_reserva: Date
  hora_reserva: string
  cod_ingreso: string | null
}

const reservaSchema = new Schema<ReservaDocument>({
  restaurante_id: {
    type: Schema.ObjectId,
    ref: 'Restaurante',
    required: true
  },

  cliente_id: {
    type: Schema.ObjectId,
    ref: 'Cliente',
    required: true
  },
  
  platos_id: {
    type: [{ type: Schema.ObjectId, ref: 'Plato', required: true }],
    required: true
  },
  
  nombre_reservante: {
    type: String,
    required: true,
    minlength: 5
  },

  motivo_de_rechazon: {
    type: String,
    required: false,
    minlength: 5
  },

  cantidad_personas: {
    type: Number,
    required: true,
    min: 1
  },

  estado: {
    type: String,
    enum: Object.values(EstadoReserva),
    default: EstadoReserva.PENDIENTE,
    required: true
  },

  fecha_reserva: {
    type: Date,
    required: true
  },
  cod_ingreso: {
    type: String,
    default: null
  },
  hora_reserva: {
    type: String,
    required: true
  }
})

const ReservaModel = mongoose.model<ReservaDocument>('Reserva', reservaSchema, 'reservas')

export { ReservaDocument, ReservaModel }
