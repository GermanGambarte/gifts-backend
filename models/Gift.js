const { Schema, model } = require('mongoose')
const giftSchema = new Schema({
  gift: String,
  quantity: Number,
  price: Number,
  image: String,
  owner: String,
})

giftSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Gift = model('Gift', giftSchema)
module.exports = Gift

