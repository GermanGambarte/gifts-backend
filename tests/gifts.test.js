const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')

const api = supertest(app)
// test('notes are returned as json', async () => {
//   await api
//     .get('/api/gifts')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })
test('there are two gifts', async () => {
  const response = await api.get('/api/gifts')
  expect(response.body).toHaveLength(1)
})
afterAll(() => {
  mongoose.connection.close()
  server.close()
})
// const {palindrome}= require('../utils/for_testing')
// test('palindrome of german', ()=> {
//   const result = palindrome('german')
//   expect(result).toBe('namreg')
// })
