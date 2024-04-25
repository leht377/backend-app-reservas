import mongoose, { Schema, Document, Types } from 'mongoose'

interface HashtagDocument extends Document {
  nombre: string
}

const hashtagSchema = new Schema<HashtagDocument>({
  nombre: { type: String, required: true, minlength: 5, maxlength: 20 }
})

const HashtagModel = mongoose.model('Hashtag', hashtagSchema, 'hashtags')

export { HashtagModel, HashtagDocument }
