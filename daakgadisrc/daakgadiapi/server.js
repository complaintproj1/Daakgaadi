const express = require('express')


const dotenv = require('dotenv')
const PORT = process.env.PORT || 8000
const YOUR_JWT_SECRET_KEY = process.env.YOUR_JWT_SECRET_KEY;
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const routes = require('./routes/routes')

const cors = require('cors')

const cookieParser = require('cookie-parser')
const local = 'http://localhost:4200'
const firebase = 'https://daakgadi.web.app'

dotenv.config()

const app = express()

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// const allowedOrigins = ['https://daakgadi.web.app'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

app.use(cors());//to follow cors policy
app.use(cookieParser())

app.use(express.json())
app.use('/api', routes)
mongoose.connect("mongodb+srv://complaintproj1:complaintproj1@cluster0.vkczxhw.mongodb.net/server?retryWrites=true&w=majority").then(()=>{
    console.log("Connection Successful")
}).catch((err)=>console.log(err));


app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
  })
  
  app.get('/',(req,res) =>{

    console.log("hello")
    res.json('working')
})
  
app.use(express.json());

