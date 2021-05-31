const mongoose = require('mongoose')
const Schema = mongoose.Schema

const receiverSchema = new Schema({  

    password : {
        type : String ,
        required : true 
    },
    name : {
    type : String ,
    required : true 
    },
    email : {
        type : String ,
        required : true
    },
    Mob : {
        type : Number ,
        required : true 
    },
    age : {
        type : Number ,
        required :  true 
    },
    weight : {
      type : Number ,
      required : true   
    },
    bloodGroup : {
        type : String ,
        required : true 
    },
    address : {
        country : {
            type : String ,
            required : true
        },
        area : {
            type : String ,
            required : true 
        },
        city : {
            type : String,
            required : true
        },
        state : {
            type : String ,
            required : true 
        },
        pincode : {
            type : Number ,
            required : true 
        }
    }

})

const receiver = mongoose.model('receiver', receiverSchema)
module.exports = receiver

