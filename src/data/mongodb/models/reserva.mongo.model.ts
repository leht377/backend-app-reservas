import mongoose, { Document, Schema, Types } from 'mongoose'
import { EstadoReserva } from '../../../common/utils'

interface ReservaDocument extends Document {
  restaurante_id: Types.ObjectId
  cliente_id: Types.ObjectId
  nombre_reservante: string
  cantidad_personas: number
  estado: EstadoReserva
  fecha_reserva: Date
  hora_reserva: Date
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

  nombre_reservante: {
    type: String,
    required: true,
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
    type: Date,
    required: true,
    validate: {
      validator: function (value: Date) {
        return !isNaN(value.getTime())
      },
      message: 'La hora de reserva debe ser una fecha válida'
    }
  }
})

const ReservaModel = mongoose.model<ReservaDocument>('Reserva', reservaSchema, 'reservas')

export { ReservaDocument, ReservaModel }
