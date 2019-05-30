const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create Schema
const RecordSchema = new Schema({
  ClientName: {
    stype: String,
    required: false
  },
  ClientPhoneNumber: {
    type: Number,
    required: false,
  },
  ClientNotes: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = record = mongoose.model('ReactPhoneRecord', RecordSchema)