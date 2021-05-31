const mongoose = require('mongoose')
const { post } = require('../routes/donorRoute')
const Schema = mongoose.Schema

const storySchema = new Schema({
    donorId :{
        type : Schema.Types.ObjectId, 
        ref : "donor"
    },
    description : {
        type : String ,
        required : true
    }

})

const story = mongoose.model("story", storySchema)
module.exports = story