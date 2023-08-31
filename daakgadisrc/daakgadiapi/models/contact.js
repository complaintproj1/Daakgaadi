const mongoose = require('mongoose')


const contactSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:false
    },
    message:{
        type:String,
        required:true
    },
    date: { type: Date, default: Date.now },

})

module.exports=mongoose.model('Contact',contactSchema)