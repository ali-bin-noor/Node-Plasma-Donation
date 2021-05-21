const requestDonorRoute = require('../staticData/requestdonor')
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const post = require('../staticData/post')


router.get('/',(req, res) =>
{
    res.send(requestDonorRoute)
})

router.post('/requestdonor', (req, res) =>
{
    var flag=0
    post.map((iterator) =>
    {
        if(iterator.bloodGroup===req.body.bloodGroup)
        {
            flag++
            res.send("Donor available for the bloodgroup "+req.body.bloodGroup+", please search for the donor,. ")
        }
    })
    if(flag===0)
    {
        requestDonorRoute.push(req.body)
        res.send("Donor requested successfully.")
    }
})

router.delete('/deleterequest',(req, res) =>
{   
    var flag=0
    requestDonorRoute.map((iterator, i) =>
    {
        if(iterator.Mob===req.body.Mob)
        {
            flag++
            requestDonorRoute.splice(i,1)
            res.send("Request deleted successfully.")

        }
    })
    if(flag===0)
    {
        res.send("Request not exist")
    }
})

router.put('/updaterequest',(req, res)=>
{
    var flag=0
    requestDonorRoute.map((iterator) =>
    {
        if(iterator.Mob===req.body.Mob)
        {
            flag++
            iterator.bloodGroup=req.body.bloodGroup
            res.send("Request updated successfully.")
        }
    })
    if(flag===0)
    {
        res.send("Request not exit.")
    }
})



module.exports = router