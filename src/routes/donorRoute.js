const express = require('express')
const isLoggedIn = require('../middleware')
const Donor = require('../models/Donor')
// const { map } = require ('../staticData/user')
const router = express.Router()
const user = require('../staticData/user')

router.get('/', (req , res) =>
{
    Donor.find().then((data) =>
    {
        res.send(data)
    }).catch((error) =>
    {
        res.send(
        {
            message : error.message

        })
    })

})

router.post('/createdonor', (req, res) =>
{
    Donor.findOne({email: req.body.email}).then((data) =>
    {
        if(data)
        {
            res.send(
                {
                    message : "Donor exist already."
        
                })
        }
        else
        {
            const donor = new Donor(
            {
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
                gender: req.body.gender,
                child: req.body.child,
                reportsDates:
                {
                    first: req.body.first,
                    second: req.body.second
                }
            })
            donor.save().then((data) =>
                {
                    console.log("save ")
                    res.send(
                        {
                            
                            message:"Donor account created.",
                            data
                        })
                }
            ).catch((error) =>
            {
                res.send(
                    {
                        message : error.message
                    })
            })
        }

    }). catch ((error) => {
        res.send({
            message: error.message
        })
    })
})

router.delete('/deletedonor',isLoggedIn ,(req, res) =>{
    Donor.remove({_id:req.body.donorId}).then((data) =>{
        res.send({            
            message : "Donor account deleted successfully."

        })
    }).catch((error) =>{
        res.send({        
            message: error.message
        })
    })
})


router.put('/updatedonor', isLoggedIn ,(req,res) =>{
    Donor.updateOne(
        {
            _id:req.body.id
        },
        {
            $set : {
                ...req.body
            }
        }).then((data) => {
            Donor.findOne({_id:req.body.id}).then((data) =>{
                if(data)
                {
                    res.send({
                        message: "Donor updated successfully.",
                        data
                    })
                }
                res.send({
                    message: "Donor not exists to update."
                })
            }).catch((error) =>{
                res.send({
                    error:error.message
                })
            })


    }).catch((error) =>{
        error:error.message
    })
})

router.put('/forgetpassword',(req, res) =>{
    Donor.updateOne(
        {
            email:req.body.email
        },
        {
            $set : {
                password : req.body.password
            }

        }).then((data) => {
            Donor.findOne({email:req.body.email}).then((DATA) =>{
                if(DATA!=null)
                {
                    res.send({
                        message: "Password reset successfully."
                    })
                }
                else
                {
                    res.send({
                        message : "email doesn't exists."
                    })
                }
            }).catch((error) =>{
                res.send({
                    error : error.message
                })
            })
        }).catch((error) => {
            res.send({
                error : error.message
            })
        })
    })
// router.get('/', (req, res) => 
// {
//     res.send(user)
// })

// router.post('/createuser', (req, res) =>
// {   
//     var flag=0
//     user.map((iterator) =>
//     {
//         if(iterator.email===req.body.email)
//         {
//             flag++
//             res.send("Donor already Exists.")
//         }
//     })
//     if(flag===0)
//     {
//         user.push(req.body)
//         res.send("Donor account created successfully.")
//     }    
          
// })

// router.delete('/deleteuser',(req, res) =>
// {

//     var flag=0
//     user.map((iterator,i) =>
//     {
//         if(iterator.email===req.body.email)
//         {
//             flag++
//             user.splice(i,1)
//             res.send("Donor deleted successfully.")
//         }
//     })
//     if(flag===0)
//     {
//         res.send("Donor doesn't exists.")
//     }  

// }
// )

// router.put('/updateuser', (req, res) =>
// {
    
//     var i
//     var flag = 0 
//     for(i=0; i<user.length; i++)
//     {
//         if(user[i].email === req.body.email)
//         {
//             flag ++
//             user[i].Mob=req.body.Mob
//             res.send("Details updated successfully.")
                      
//         }
//     }
//     if(flag === 0)
//     {
//         res.send("Wrong Email")

//     } 

// })


// router.put('/forgetpassword', (req, res) =>
// {
    
//     var i
//     var flag = 0 
//     for(i=0; i<user.length; i++)
//     {
//         if(user[i].email === req.body.email)
//         {
//             flag = 1
//             user[i].password=req.body.password
//             res.send("Password updated successfully.")
                      
//         }
//     }
//     if(flag === 0)
//     {
//         res.send("Wrong Email")

//     } 

// })


module.exports = router