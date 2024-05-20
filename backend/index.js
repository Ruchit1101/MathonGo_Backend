const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const path = require('path')
const app = express();
dotenv.config();
const listRoute = require('./routes/listRoute');
const userRoute = require('./routes/userRoute');

app.use(bodyParser.json());
app.get('/',(req, res)=>{
       res.send(`Server is live`);
})
app.use('/api/lists', listRoute);
app.use('/api/users', userRoute);
// CONNECTIN THE SERVER...
const port = process.env.MY_PORT || 4001;
const server = app.listen(port, ()=>{
       // console.log(`Server is running on port: ${port}`);
})
server.on('error', (error)=>{
       console.error(`Error in starting server ${error}`);
})
// CONNECTING THE DATABASE...
connectDB();
