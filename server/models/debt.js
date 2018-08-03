const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const debtSchema = new Schema({
    deudor: String,
    acreedor: String,
    total: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const debt = mongoose.model('debt', debtSchema);
module.exports = debt;
