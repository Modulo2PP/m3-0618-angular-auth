const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String, required: true, unique: true},
  password: {type:String, required: true},
  email: String,
  profilePic: {type: String, default:"http://ishowmy.support/img/user-icon-360x360.jpg"},
  estatus: {type:String, default: "Disponible"},
  debt: Array
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;