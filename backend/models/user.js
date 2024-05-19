const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     name:{type:String, required:true,},
     email:{type:String, require:true, unique: true},
     properties:{type:Map, of:String},
     list:{ type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
});

module.exports = mongoose.model('User', userSchema);