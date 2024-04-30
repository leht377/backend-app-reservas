import mongoose, { Schema, Types, Document } from 'mongoose'
import { HorasServicioRestaurante, DiasServicioRestaurante } from '../../../common/utils'

interface RestauranteDocument extends Document {
  usuario_id: Types.ObjectId
  menu_id?: Types.ObjectId
  nombre: string
  descripcion?: string
  calificacion?: number
  cantidad_resenas?: number
  locacion: string
  horas_servicio?: HorasServicioRestaurante[]
  dias_servicio?: DiasServicioRestaurante[]
  url_fotos_restaurantes?: string[]
  url_fotos_instalacciones?: string[]
  fechas_bloqueadas_reservas?: Date[]
}

const restauranteSchema = new Schema<RestauranteDocument>({
  usuario_id: { type: Schema.ObjectId, required: true, ref: 'Usuario' },
  menu_id: { type: Schema.ObjectId },
  nombre: { type: String, required: true },
  locacion: { type: String, required: true },

  descripcion: { type: String, default: '' },
  calificacion: { type: Number, default: 0 },
  cantidad_resenas: { type: Number, default: 0 },
  url_fotos_instalacciones: { type: [{ type: String }] },
  url_fotos_restaurantes: { type: [{ type: String }] },
  horas_servicio: {
    type: [{ type: String, enum: Object.values(HorasServicioRestaurante) }]
  },
  dias_servicio: {
    type: [{ type: String, enum: Object.values(DiasServicioRestaurante) }]
  },
  fechas_bloqueadas_reservas: {
    type: [{ type: Date }]
  }
})

const RestuaranteModelo = mongoose.model<RestauranteDocument>(
  'Restaurante',
  restauranteSchema,
  'restaurantes'
)

export { RestauranteDocument, RestuaranteModelo }
