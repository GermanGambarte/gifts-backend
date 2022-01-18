const mongoose = require('mongoose')

const connectionString =
  'mongodb+srv://ioreksjj:2645875659Ger@cluster0.zyzfi.mongodb.net/iorekdb?retryWrites=true&w=majority'

mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log('DataBase connected'))
  .catch((err) => console.error(err))
mongoose.connection
  .once('open', () => console.log('Conection has been made!'))
  .on('error', (error) => console.log('Error is: ', error))

// process.on('uncaughtException', () => mongoose.connection.disconnect())
