const express = require('express')
const cors = require('cors')
const { v4: uuid } = require('uuid')
const app = express()

app.use(cors())
app.use(express.json())

let gifts = [
  {
    id: '1',
    gift: 'Chocolate',
    quantity: 3,
    price: 10,
    owner: 'Olga',
  },
  {
    id: '2',
    gift: 'Remera',
    quantity: 2,
    price: 20,
    owner: 'Raul',
  },
  {
    id: '3',
    gift: 'Vitel Toné',
    quantity: 1,
    price: 50,
    owner: 'Teresa',
  },
  {
    id: '4',
    gift: 'Caramelos',
    quantity: 5,
    price: 12,
    owner: 'Horacio',
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/gifts', (request, response) => {
  response.json(gifts)
})

app.get('/api/gifts/:id', (request, response) => {
  const id = request.params.id
  const gift = gifts.find((gift) => gift.id === id)
  response.send(gift)
})
app.put('/api/gifts/:id', (request, response) => {
  const id = request.params.id
  const body = request.body
  gifts = gifts.map((gift) => {
    if (gift.id === id) {
      gift.gift = body.gift
      gift.quantity = body.quantity
      gift.image = body.image
      gift.price = body.price
      gift.owner = body.owner
    }
    return gift
  })
  response.send(gifts)
})

app.delete('/api/gifts/:id', (request, response) => {
  const id = request.params.id
  gifts = gifts.filter((gift) => gift.id !== id)
  response.send(gifts)
})

app.post('/api/gifts', (request, response) => {
  const gift = request.body
  if (!gift || !gift.gift) {
    return response.status(400).json({
      error: 'gift.gift is missing',
    })
  }
  const newGift = {
    id: uuid(),
    gift: gift.gift,
    quantity: gift.quantity,
    image: gift.image,
    price: gift.price,
    owner: gift.owner,
  }
  response.json(newGift)
  gifts = [...gifts, newGift]
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
