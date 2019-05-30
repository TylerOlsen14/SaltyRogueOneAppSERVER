const express = require('express');
const router = express.Router();

// Client Model - Helop make queries
const Record = require('../../models/record')

// adding a series of routes
// @route   GET api/items
// @desc    GET all ITems
// @access  Public
router.get('/', async(req, res) => {
  await Record.find()
    .sort({ date: -1 }) // sort descending
    .then(records => res.json(records))
})

// @desc   GET one item
router.get('/:id', async (req, res) => {
  await Record
    .findById(req.params.id)
    .then(records => res.json(records))
})

// @route   POST api/record
// @desc    Create a record entry
// @access  Public
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  Record
    .findById(req.params.id)
    .then(record => record.remove())
    .then(() => res.json({success: true}))
    .catch (err => res.status(404).json({success: false}))
})

module.exports = router