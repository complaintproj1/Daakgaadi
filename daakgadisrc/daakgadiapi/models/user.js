const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
     phone: {
        type: String,
        unique: true,
        required: true
    },
    amount:{
        type:Number,
        required:false
    },
    password: {
        type: String,
        required: true
    },
    invoices:[],

    date: { type: Date, default: Date.now },

})

module.exports = mongoose.model('User', userSchema)