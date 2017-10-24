const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  content: { type: String, required: true }
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

const beerSchema = new mongoose.Schema({
  brewery: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  abv: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: String,
  comments: [ commentSchema ]
});

beerSchema.methods.belongsTo = function beerBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

module.exports = mongoose.model('Beer', beerSchema);
