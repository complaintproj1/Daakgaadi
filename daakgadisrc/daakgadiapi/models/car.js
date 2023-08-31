
const mongoose = require('mongoose')


const carSchema = new mongoose.Schema({
  
  email: { type: String, required: true },
  contact: { type: String, required: true },
  detail: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, default: Date.now },
  amount:{
    type:Number,
    required:false
},
    status: {
        type: String,
        default: 'Received goods', // Default status is 'pending', but it will be updated to 'done' when clicked on the upload button.
      },
  
     
      statusHistory: [
        {
          status: { type: String, default: 'Received goods' },
          timestamp: { type: Date, default: Date.now }
        }
      ]
})

module.exports = mongoose.model('Car',  carSchema)