const receiver = require('../staticData/reciever')
const express = require('express')
const router = express.Router()
const post = require('../staticData/post')
const Receiver = require('../models/Receiver')

router.get('/',(req, res) =>{
    Receiver.find().then((data) =>{
        res.send(data)
    }).catch((error) =>{
        res.send({
            error:error.message
        })
    })
    
})

router.post('/createreceiver', (req, res) =>{
    Receiver.findOne({email:req.body.email}).then((data) =>{
        if(data)
        {
            res.send({
                message: "Receiver exist already."
            })
        }
        else
        {
            const reciever = new Receiver ({
                password: req.body.password,
                name: req.body.name,
                email: req.body.email,
                Mob: req.body.Mob,
                age: req.body.age,
                weight:req.body.weight ,
                bloodGroup: req.body.bloodGroup,
                address:{
                        country: req.body.country,
                        area: req.body.area,	
                        city: req.body.city,	
                        state: req.body.state,	
                        pincode: req.body.pincode 
                    },
                           
            })
            reciever.save().then((data) =>{
                res.send({
                    message: "Receiver account is created successfully.",
                    data
                })
            }).catch((error) =>{
                res.send({
                    message: error.message
                })
            })

        }
    }).catch((error) =>{
        res.send({
            message: error.message
        })
    })
})

router.delete('/deletereceiver',(req, res) =>{
    Receiver.remove({_id:req.body.id}).then((data) =>{
        console.log(data)
        if(data.deletedCount===0)
        {
            
            res.send({
                message: "Receiver doesn't exists."
            })
        }
        else 
        {
            res.send({
                message : "Reciever deleted successfully."
            })
        }
    }).catch((message)=>{
        res.send({
            message: error.message
        })
    })
})
// router.get('/',(req, res) =>
// {
//     res.send(receiver)
// })

// router.post('/createreceiver',(req, res) =>
// {
//     var flag=0;
//     receiver.map((iterator) =>
//     {
//         if(iterator.email===req.body.email)
//         {
//             flag++
//             res.send("Receiver Details already exists.")
//         }
//     })
//     if(flag===0)
//     {
//         receiver.push(req.body)
//         res.send("Receiver Details inserted successfully.")
//     }
// })

// router.delete('/deletreceiver', (req, res) =>
// {   
//     var flag=0
//     receiver.map((iterator,i) =>
//     {
//         if(iterator.email===req.body.email)
//         {
//             flag++
//             receiver.splice(i,1)
//             res.send("Receiver details deleted successfully.")
//         }
//     }
//     )
//     if(flag===0)
//     {
//         res.send("Receiver details doesn't exists for delete.")
//     }
// })

// router.put('/updatereceiver',(req, res) =>
// {   
//    var flag=0
//     var i
//     for(i=0; i<receiver.length; i++)
//     {
//         if(receiver[i].email===req.body.email)
//         {
//             flag++
//             receiver[i].name=req.body.name
//             res.send("Reciever details updated successfully.")
            
//         }
//     }
//     if(flag===0)
//     {
//         res.send("Receiver details doesn't exists for delete.")

//     } 
// })

// router.get('/searchdonor',(req, res) =>
// {
//     var flag=0
//     var donor= []
//     var i
//     for (i = 0; i < post.length; i++) 
//     {
//         // console.log("Hi from for ")
//         if(post[i].bloodGroup===req.body.bloodGroup)
//         {   
//             // var temp 
//             // console.log(i)
//             flag++
//             // temp=post[i]
//             // console.log("temp:"+ temp)
//             // // donor[i]=push[i]
//             donor.push(post[i])
//             // console.log(donor)
//         }
        
//     }
//     if(flag>0)
//     {
//         res.send(donor)
//     }

//     else if(flag===0)
//     {
//         res.send("Donor not present with required bloodgroup, please create a request for donor with required bloodgroup.")
//     }
// })



module.exports = router