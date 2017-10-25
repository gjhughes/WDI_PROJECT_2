const mongoose = require('mongoose');

const brewerySchema = new mongoose.Schema({
  breweryName: { type: String, required: true },
  address: { type: String, required: true },
  openingHours: {  },
  image: String
});

module.exports = mongoose.model('Brewery', brewerySchema);
