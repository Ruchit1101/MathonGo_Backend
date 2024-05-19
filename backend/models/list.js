const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
       title:{type:String, required:true},
       customProp:{type:Map, of:String, default:{}}
});

module.exports=mongoose.model('List', ListSchema);