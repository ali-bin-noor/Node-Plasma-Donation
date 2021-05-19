const express = require('express')
const app = express()
const bodyParser = require('body-parser')


//Routes 
const userRoute = require('./src/routes/userRoute')
const postRoute = require('./src/routes/postRoute')
const storyRoute = require('./src/routes/storyRoute')
const receiverRouter = require('./src/routes/receiverRoute')

const PORT=6000






app.get('/', (req, res) => 
{
    res.send("hello world")
}) 




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/story', storyRoute)
app.use('/receiver', receiverRouter)


app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)    
})
