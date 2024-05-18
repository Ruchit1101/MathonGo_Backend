const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const app = express();
dotenv.config();

// CONNECTIN THE SERVER...
const port = process.env.MY_PORT || 4000;
const server = app.listen(port, ()=>{
       console.log(`Server is running on port: ${port}`);
})
server.on('error', (error)=>{
       console.error(`Error in starting server`);
})
// CONNECTING THE DATABASE...
connectDB();