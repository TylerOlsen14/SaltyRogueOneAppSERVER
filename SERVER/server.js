const express = require('express'); // Backend framework
const mongoose = require('mongoose'); // ORM to interact with database
const bodyParser = require('body-parser'); // allow requests and get data from body
const cors = require('cors')
// const path = require('path') // Deal with file paths

const app = express();

// const record, address = require('./routes/api/api')
const record = require('./routes/api/record')
const address = require('./routes/api/address')

app.use(cors())

// Bodyparser middleware
app.use(bodyParser.json())

// DB config
const db = require('./config/keys').mongoURI;

// connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected ... '))
  .catch(err => console.log(err))

const port = process.env.PORT || 5000;

  // use routes
app.use('/record', record)
app.use('/address', address)

app.listen(port, () => console.log(`Server started on port ${port}`))