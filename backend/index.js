const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const app = express();
dotenv.config();
const listRoute = require('./routes/listRoute')

app.get('/',(req, res)=>{
       res.send(`Server is live`);
})
app.use('/api/list', listRoute);
// CONNECTIN THE SERVER...
const port = process.env.MY_PORT || 4001;
const server = app.listen(port, ()=>{
       console.log(`Server is running on port: ${port}`);
})
server.on('error', (error)=>{
       console.error(`Error in starting server`);
})
// CONNECTING THE DATABASE...
connectDB();