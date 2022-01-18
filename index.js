require('dotenv').config()
require('./mongo')
const Gift = require('./models/Gift')
const express = require('express')
const cors = require('cors')
const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/gifts', (request, response) => {
  Gift.find({}).then((gifts) => response.json(gifts))
})

app.get('/api/gifts/:id', (request, response, next) => {
  const id = request.params.id
  Gift.findById(id)
    .then((gift) => {
      if (gift) return response.json(gift)
      response.status(404).end()
    })
    .catch((err) => next(err))
})

app.put('/api/gifts/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body
  const newGiftInfo = {
    gift: body.gift,
    quantity: body.quantity,
    image: body.image,
    price: body.price,
    owner: body.owner,
  }
  Gift.findByIdAndUpdate(id, newGiftInfo, { new: true })
    .then((result) => response.json(result))
    .catch((err) => next(err))
})

app.delete('/api/gifts/:id', (request, response, next) => {
  const id = request.params.id
  Gift.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch((err) => next(err))
})

app.post('/api/gifts', (request, response, next) => {
  const gift = request.body
  if (!gift || !gift.gift)
    response.status(400).json({
      error: 'required "regalo" field is missing',
    })
  const newGift = new Gift({
    gift: gift.gift,
    quantity: gift.quantity,
    price: gift.price,
    owner: gift.owner,
    image: gift.image,
  })
  newGift
    .save()
    .then((savedGift) => response.json(savedGift))
    .catch((err) => next(err))
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
