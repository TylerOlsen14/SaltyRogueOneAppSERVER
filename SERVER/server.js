const express = require('express'); // Backend framework
const mongoose = require('mongoose'); // ORM to interact with database
const bodyParser = require('body-parser'); // allow requests and get data from body
const cors = require('cors')
const path = require('path') // Deal with file paths

const record = require('./routes/api/record')

const app = express();

app.use(cors())
// Bodyparser middleware
app.use(bodyParser.json())

// DB config
const db = require('./config/keys')

// connect to Monog
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected ... '))
  .catch(err => console.log(err))

  // use routes
app.use('/', record)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server stated on port ${port}`))