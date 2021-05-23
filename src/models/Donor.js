const mongoose = require('mongoose')
const Schema = mongoose.Schema

const donorSchema= new Schema({
    name : {
        type: String ,
        required : true
    },

    email : {
        type : String,
        required : true
    },
    Mob : {
        type : Number,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    weight : {
        type : Number ,
        required : true
    },
    bloodGroup : {
        type : String,
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
    },
    gender : {
        type : String ,
        required : true
    },
    child : {
        type : String,
        required : true 
    },
    reportsDates : {
        first : {
            type : Date ,
            required :  true 
        },
        second : {
            type : Date ,
            required :  true 
        }

    }


})

const donor = mongoose.model("donor", donorSchema) 
module.exports = donor