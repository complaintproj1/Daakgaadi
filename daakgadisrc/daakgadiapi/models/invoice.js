const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    amount:{
        type:Number,
        required:false
    },
    products: [{
        name: {
            type:String,
            required:true

        },
        price: {
            type:Number,
            required:true
        },
        qty: {
            type:Number,
            required:true
        }
    }],
    
    additionalDetails: {
        type:String,
    },
    date: { type: Date, default: Date.now },

    status: {
        type: String,
        default: 'pending', // Default status is 'pending', but it will be updated to 'done' when clicked on the upload button.
      },

})

module.exports = mongoose.model('Invoice', invoiceSchema)