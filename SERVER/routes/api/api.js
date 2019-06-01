const express = require('express');
const router = express.Router();

// Client Model - Helop make queries
const Record = require('../../models/record')
const address = require('../../models/address')

// adding a series of routes
// @route   GET api/items
// @desc    GET all ITems
// @access  Public
router.get('/record/', async(req, res) => {
  await Record.find()
    .sort({ date: -1 }) // sort descending
    .then(records => res.json(records))
})

// @desc   GET one item
router.get('/record/:id', async (req, res) => {
  await Record
    .findById(req.params.id)
    .then(records => res.json(records))
})

// @route   POST api/record
// @desc    Create a record entry
// @access  Public
router.post('/record/', (req, res) => {
  const newRecord = new Record({
    ClientName: req.body.ClientName,
    ClientPhoneNumber: req.body.ClientPhoneNumber,
    ClientNotes: req.body.ClientNotes
  });
  newRecord.save().then(Record => res.json(Record)); // save to the database, spit out json
})

// @route   PUT api/record
// @desc    Edit a record entry
// @access  Public
router.put('/record/:id', (req, res) => {
  Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, Record) => {
      // handle any errors
      if (err) return res.status(500).send(err);
      return res.send(Record);
    }
  )
});

// @route   DELETE api/record
// @dex     DELETE a record entry
// @access  Public
router.delete('/record/:id', (req, res) => {
  Record
    .findById(req.params.id)
    .then(record => record.remove())
    .then(() => res.json({success: true}))
    .catch (err => res.status(404).json({success: false}))
})


address
router.get('/address/', async (req, res) => { //represents api/items (because we're already in that file)
  await address.find()
    .then(address => res.json(address))
})

router.get('/address/:id', async(req, res) => {
  await address
    .findById(req.params.id)
    .then(address => res.json(address))
})

router.post('/address/', (req, res) => {
  const newAddress = new address({
    name: req.body.name, // comes from a request
    url: req.body.url, 
    address: req.body.address,
    notes: req.body.notes,
  });
  newAddress.save().then(address => res.json(address)); //save to the database, spit out JSON
})

router.put('/address/:id', (req, res) => {
  console.log(req.body)
  address.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, address) => {
      if (err) return res.status(500).send(err);
      return res.send(address);
    }
  ) 
});

router.delete('/address/:id', (req, res) => { //represents api/items (because we're already in that file)
  address
    .findById(req.params.id)
    .then(address => address.remove()
    .then(() => res.json({sucess: true})))
    .catch (err => res.status(404).json({success: false}))
})

module.exports = router