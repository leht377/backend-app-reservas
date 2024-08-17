import mongoose, { Schema, Types, Document } from 'mongoose'
import { HorasServicioRestaurante, DiasServicioRestaurante } from '../../../common/utils'
import paginate from 'mongoose-paginate-v2'

interface FotoInstalacionDocument extends Document {
  uri: string
}

const fotoInstalacionSchema = new Schema<FotoInstalacionDocument>({
  uri: { type: String, required: true }
})

interface RestauranteDocument extends Document {
  usuario_id: Types.ObjectId
  menu_id?: Types.ObjectId
  nombre: string
  descripcion?: string
  calificacion?: number
  cantidad_resenas?: number
  calificacion_promedio?: number
  locacion: string
  visible: boolean
  horas_servicio?: HorasServicioRestaurante[]
  dias_servicio?: DiasServicioRestaurante[]
  url_fotos_restaurantes?: string[]
  url_fotos_instalacciones?: FotoInstalacionDocument[]
  fechas_bloqueadas_reservas?: Date[]
}

const restauranteSchema = new Schema<RestauranteDocument>({
  usuario_id: { type: Schema.ObjectId, required: true, ref: 'Usuario' },
  menu_id: { type: Schema.ObjectId },
  nombre: { type: String, required: true },
  locacion: { type: String, required: true },
  visible: { type: Boolean, default: false },
  descripcion: { type: String, default: '' },
  calificacion: { type: Number, default: 0 },
  cantidad_resenas: { type: Number, default: 0 },
  calificacion_promedio: { type: Number, default: 0 },
  url_fotos_instalacciones: { type: [{ type: fotoInstalacionSchema }] },
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

restauranteSchema.plugin(paginate)
const RestuaranteModelo = mongoose.model<
  RestauranteDocument,
  mongoose.PaginateModel<RestauranteDocument>
>('Restaurante', restauranteSchema, 'restaurantes')

export { RestauranteDocument, RestuaranteModelo }
