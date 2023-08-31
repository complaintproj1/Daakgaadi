
const mongoose = require('mongoose')


const estimateSchema = new mongoose.Schema({
  
  email: { type: String, 
   
    required: false },
    to: { type: String, 
   
      required: false },
      from: { type: String, 
   
        required: false },
        routeid: { type: String, 
   
          required: false },

          froms: { type: String, required: true },
          tos: { type: String, required: true },
          product: { type: String, required: true },

          
    name: { type: String, 
   
      required: false },
  contact: { type: String, required: false },
    length: {
        type: Number,
        required: false
    },
    breadth: {
        type: Number,
        required: false
    },
    height: {
        type: Number,
        required: false
    },
    multiplier:{
        type:Number,
        required:false
    },
    estimateResult:{
        type:Number,
        required:false
    },
    status: {
        type: String,
        default: 'Received goods', // Default status is 'pending', but it will be updated to 'done' when clicked on the upload button.
      },
    actualweight:{
            type:Number,
            required:false

      },
    
      isconfirm:{
        type:Boolean,
        default:false
      },
      boxes:{
        type:Number,
        default:1
      },
      price:{
        type:Number,
        required:false
      },
      amount:{
        type:Number,
        required:false
    },
      color: {
        type: String,
        default: 'crimson'
      },
      date: { type: Date, default: Date.now },

      statusHistory: [
        {
          status: { type: String, default: 'Received goods' },
          timestamp: { type: Date, default: Date.now }
        }
      ],
      multibox: [],

    oda: { type: String, 
   
      required: false },
      pickup: { type: String, 
   
        required: false },
      
          delivery: { type: String, 
   
            required: false },
            no2: { type: String, 
   
              required: false },
              pickdate: { type: String, 
   
                required: false },
                eway: { type: String, 
   
                  required: false },
                  gst: { type: String, 
   

                    required: false },
                    invoiceno: { type: String, 
   
                      required: false },
                      desc: { type: String, 
   
                        required: false },
                        goods: { type: String, 
   
                          required: false },
                          goodvalue: { type: String, 
   
                            required: false },
                          vehicle: { type: String, 
   
                            required: false },
                            basic: { type: String, 
   
                              required: false },

                              pickupcharge: { type: String, 
   
                                required: false },
                                delivercharge: { type: String, 
   
                                  required: false },
                                  topay: { type: String, 
   
                                    required: false },
                                    docate: { type: String, 
   
                                      required: false },
                                      handling: { type: String, 
   

                                        required: false },
                                        storage: { type: String, 
   
                                          required: false },
                                          misl: { type: String, 
   
                                            required: false },

                                            subtotal: { type: String, 
   

                                              required: false },
                                              
                                              totalamount:{
                                                type:Number,
                                                default:1
                                              },
                                            
                                      })



module.exports = mongoose.model('Estimate', estimateSchema)