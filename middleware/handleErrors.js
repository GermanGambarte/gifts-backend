module.exports = (error, request, response, next) => {
  console.error(error)
  if (error.name === 'CastError')
    response.status(400).end({ error: 'id used is malformed' })

  response.status(500).end()
}
