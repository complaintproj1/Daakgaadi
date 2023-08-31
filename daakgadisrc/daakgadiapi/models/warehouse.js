
const mongoose = require('mongoose')


const estimateSchema = new mongoose.Schema({
    name: { type: String, required: true },

  email: { type: String, required: true },
  contact: { type: String, required: true },
  sqft: { type: String, required: true },
  location: { type: String, required: true },
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

module.exports = mongoose.model('Warehouse',  estimateSchema)