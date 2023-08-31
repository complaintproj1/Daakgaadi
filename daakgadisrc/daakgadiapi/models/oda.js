
const mongoose = require('mongoose')


const routeSchema = new mongoose.Schema({
  
  oda: { type: String, required: true },
  rid: { type: String, required: true },
  date: { type: Date, default: Date.now },
  amount:{
    type:Number,
    required:false
},
 
      statusHistory: [
        {
          status: { type: String, default: 'Received goods' },
          timestamp: { type: Date, default: Date.now }
        }
      ],
    
})

module.exports = mongoose.model('Oda',  routeSchema)