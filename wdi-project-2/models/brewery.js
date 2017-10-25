const mongoose = require('mongoose');

const brewerySchema = new mongoose.Schema({
  breweryName: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    line2: String,
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true }
  },
  image: String
});

module.exports = mongoose.model('Brewery', brewerySchema);
