const express = require('express')
const router = express.Router()
const Donor = require('../models/Donor')
const Receiver = require('../models/Receiver')
const jwtsecret = require('../../config/').jwtsecret
const jwt = require('jsonwebtoken')

router.get('/logindonor', (req, res) => {
    Donor.findOne({email:req.body.email,password:req.body.password}).then((data) =>{
        if(data)
        {
            console.log("hello")
            const accessToken = jwt.sign({
                data : {
                    _id:data._id
                }
            }, jwtsecret)
            res.send({
                accessToken,
                data
            })
        } 
        else
        {
            res.send({
                message : "Wrong email and password."
            })
        }  
    }).catch((error) =>{
        res.send({
            error : error.message
        })
    })
})


router.get('/loginreceiver', (req, res) => {
    Receiver.findOne({email:req.body.email,password:req.body.password}).then((data) =>{
        if(data)
        {
            console.log("hello")
            const accessToken = jwt.sign({
                data : {
                    _id:data._id
                }
            }, jwtsecret)
            res.send({
                accessToken,
                data
            })
        } 
        else
        {
            res.send({
                message : "Wrong email and password."
            })
        }  
    }).catch((error) =>{
        res.send({
            error : error.message
        })
    })
})

// router.Receiver('/receiverlogin', (req, res) =>{
//     Receiver.findOne({email:req.body.email, password:req.body.password}).then((data) =>{
//         if(data)
//         {
//             const accessToken = jwt.sign({
//                 data :{
//                     email:
//                 }
//             },jwtsecret)
//         }
//     }).catch((error))
// })

module.exports = router