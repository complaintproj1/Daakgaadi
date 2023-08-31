
const mongoose = require('mongoose')


const routeSchema = new mongoose.Schema({
  
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, required: true },

  amount:{
    type:Number,
    required:false
},
 
time:{
    type:Number,
    required:false
},

 

      statusHistory: [
        {
          status: { type: String, default: 'Received goods' },
          timestamp: { type: Date, default: Date.now }
        }
      ],
      oda: []
})

module.exports = mongoose.model('Route',  routeSchema)