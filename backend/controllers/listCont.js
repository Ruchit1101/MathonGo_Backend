const List = require('../models/list');

exports.createList= async(req, res)=>{
       const {title, props}= req.body;
       try{
              const newList = new List({title, props});
              await newList.save();
              res.status(201).json({message:'List Created Successfully !', list:newList})
       }
       catch(err){
              res.status(500).json({message:`Error in creating list ${err}`});
       }
};