const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const favorSchema = new Schema({
    description: String,
    cost: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const favor = mongoose.model('favor', favorSchema);
module.exports = favor;
