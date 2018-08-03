const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    members: [{ type : Schema.Types.ObjectId, ref: 'User' }],
    favors: [{ type : Schema.Types.ObjectId, ref: 'favor' }],
    groupPic: {type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWam7rBttceZ4DJiWfRg2jrwchZMVuiQx2mXlmYjvFqR4Wf21V6w"}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const group = mongoose.model('group', groupSchema);
module.exports = group;


