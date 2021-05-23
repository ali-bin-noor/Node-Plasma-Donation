const requestDonorRoute = require('../staticData/requestdonor')
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const post = require('../staticData/post')
const Request = require('../models/Request')
const Post =require('../models/Post')

router.get('/',(req, res) =>{
    Request.find().then((data) =>{
        if(data){
            res.send(data)
        }  
    }).catch((error) =>{
        error: error.message
    })
})

router.post('/createrequest',(req, res) =>{
    Post.findOne({bloodGroup:req.body.bloodGroup}).then((data) => {
        if(data)
        {
            res.send({
                message: "Donor already exists."
            })
        }
        else
        {
            Request.findOne({email:req.body.email}).then((data) =>{
                if(data)
                    {
                        res.send({
                            message: "Request already exist with same mail."
                        })
                    }
                
                    else
                    {
                        const request = new Request({
                        name:req.body.name,
                        email:req.body.email,
                        bloodGroup:req.body.bloodGroup,
                        Mob:req.body.Mob
                        })
                    
                    request.save().then((data) =>{
                        res.send({
                            message: "Request created successfully.",
                            data
                        })
                    }).catch((error) =>{
                        error: error.message
                    })
                }
            })    

        }
    }).catch((error) =>{
        res.send({
            error:error.message
        })
    })
})

router.delete('/deleterequest',(req, res) =>{
    Request.remove({email:req.body.email}).then((data) =>{
        if(data.deletedCount===0)
        {
            res.send({
                message: "Request doesn't exists for deletion."
            })
        }
        else 
        {
            res.send({
                message: "Request deleted successfully."
            })
        }
    }).catch((error) => {
        res.send({
            error:error.message
        })
    })
})
// router.get('/',(req, res) =>
// {
//     res.send(requestDonorRoute)
// })

// router.post('/requestdonor', (req, res) =>
// {
//     var flag=0
//     post.map((iterator) =>
//     {
//         if(iterator.bloodGroup===req.body.bloodGroup)
//         {
//             flag++
//             res.send("Donor available for the bloodgroup "+req.body.bloodGroup+", please search for the donor,. ")
//         }
//     })
//     if(flag===0)
//     {
//         requestDonorRoute.push(req.body)
//         res.send("Donor requested successfully.")
//     }
// })

// router.delete('/deleterequest',(req, res) =>
// {   
//     var flag=0
//     requestDonorRoute.map((iterator, i) =>
//     {
//         if(iterator.Mob===req.body.Mob)
//         {
//             flag++
//             requestDonorRoute.splice(i,1)
//             res.send("Request deleted successfully.")

//         }
//     })
//     if(flag===0)
//     {
//         res.send("Request not exist")
//     }
// })

// router.put('/updaterequest',(req, res)=>
// {
//     var flag=0
//     requestDonorRoute.map((iterator) =>
//     {
//         if(iterator.Mob===req.body.Mob)
//         {
//             flag++
//             iterator.bloodGroup=req.body.bloodGroup
//             res.send("Request updated successfully.")
//         }
//     })
//     if(flag===0)
//     {
//         res.send("Request not exit.")
//     }
// })



module.exports = router