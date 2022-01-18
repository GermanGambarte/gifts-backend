const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log('DataBase connected'))
  .catch((err) => console.error(err))

process.on('uncaughtException', () => mongoose.connection.disconnect())
