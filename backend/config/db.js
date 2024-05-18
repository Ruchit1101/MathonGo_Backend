const mongoose = require('mongoose');

const connectDB = async()=>{
       try{
              await mongoose.connect(process.env.MY_DB);
              console.log('Database connected');
       }
       catch(error){
              console.error(`Error in connecting DB...`);
              process.exit(1);
       }
}

module.exports=connectDB