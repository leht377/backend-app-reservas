import mongoose, { Schema, Document, Types } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

interface HashtagDocument extends Document {
  nombre: string
}

const hashtagSchema = new Schema<HashtagDocument>({
  nombre: { type: String, required: true, minlength: 5, maxlength: 20, unique: true }
})
hashtagSchema.plugin(uniqueValidator)
const HashtagModel = mongoose.model<HashtagDocument>('Hashtag', hashtagSchema, 'hashtags')

export { HashtagModel, HashtagDocument }
