const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoURL = require('./config/').mongoURL


//Routes 
const donor = require('./src/routes/donorRoute')
const post = require('./src/routes/postRoute')
const story = require('./src/routes/storyRoute')
const receiver = require('./src/routes/receiverRoute')
const requestDonor = require('./src/routes/requestDonorRoute')

const PORT=6000






app.get('/', (req, res) => 
{
    res.send("hello world")
}) 




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/donor', donor)
app.use('/post', post)
app.use('/story', story)
app.use('/receiver', receiver)
app.use('/requestdonor', requestDonor)

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useFindAndModify: false, 
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database Successfully connected :)")
}).catch((error)=>{
    console.log(`ERROR: ${error.message}`);
})


app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT} :)` )    
})
