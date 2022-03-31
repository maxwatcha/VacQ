const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss=require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp=require('hpp');
const cors = require('cors');
//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Body parser
const app=express();
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Sanitzie data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Enable CORS
app.use(cors());
//rateLimit
const limiter = rateLimit({
    windowsMs:10*60*1000,//10 mins
    max: 1
});
app.use(limiter);

//route files
const hospitals = require ('./routes/hospitals');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments')

//Prevent http param pollutions
app.use(hpp());

app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/auth',auth);
app.use('/api/v1/appointments', appointments);

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
