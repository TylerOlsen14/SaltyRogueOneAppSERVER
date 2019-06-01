const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AddressSchema = new Schema({
  name: {
    type: String
  },
  url: {
    type: String
  },
  address: {
    type: String
  }, 
  notes: {
    type: String
  }
},
{collection: 'address'}
)

const address = mongoose.model('address', AddressSchema);

module.exports = address