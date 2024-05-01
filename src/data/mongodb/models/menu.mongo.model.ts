import mongoose, { Schema, Document, Types } from 'mongoose'

interface MenuDocument extends Document {
  restaurante_id: Types.ObjectId
  platos_ids: Types.ObjectId[]
}

const menuSchema = new Schema<MenuDocument>({
  restaurante_id: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Restaurante'
  },
  platos_ids: {
    type: [{ type: Schema.ObjectId, ref: 'Plato' }],
    default: []
  }
})

const MenuModel = mongoose.model<MenuDocument>('Menu', menuSchema, 'menus')

export { MenuDocument, MenuModel }
