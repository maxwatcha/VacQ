const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

const app=express();
app.use(express.json());

const hospitals = require ('./routes/hospitals');

app.use('/api/v1/hospitals',hospitals)

// app.get('/', (req,res) => {
//     // res.send("<h1>Hello from express</h1>");
//     // res.send({name:"Brad"});
//     // res.json({name:"Brad"});
//     // res.sendStatus(400);
//     // res.status(400).json({success:false});
//      res.status(200).json({success:true, data:{id:1}});
// });



const PORT=process.env.PORT || 3000;

const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1))

});
