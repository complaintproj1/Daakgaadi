
const mongoose = require('mongoose')


const estimateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  type: { type: String, required: true },
  // price: { type: String, required: true },
  // dateofshift: { type: String, required: true },
  // time: { type: String, required: true },
  addres: { type: String, required: true },
  amount:{
    type:Number,
    required:false
},
  date: { type: Date, default: Date.now },
   status: {type: String, default: 'Received goods', },
      statusHistory: [
        {
          status: { type: String, default: 'Received goods' },
          timestamp: { type: Date, default: Date.now }
        }
      ]
})

module.exports = mongoose.model('Packer',  estimateSchema)