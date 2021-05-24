const story = require('../staticData/story')
const express = require('express')
const router = express.Router()

const Story = require('../models/Story')



router.get('/',(req, res) =>{
    Story.find().then((data) =>{
        res.send(data)
    }).catch((error) =>{
        res.send({
            message : error.message
        })
    })
    
})

router.post('/createstory',(req, res) =>{
    Story.findOne({email:req.body.email}).then((data) =>{
        if(data)
        {
            res.send({
                message: "Story already exists"
            })
        }
        else
        {
            const story = new Story({
                name: req.body.name,
                email: req.body.email,
                description : req.body.description

            })
            story.save().then((data) =>{
                res.send({
                    message: "Story posted successfully."
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

router.delete('/deletestory',(req, res) =>{
    Story.remove({_id:req.body.id}).then((data) =>{
        if(data.deletedCount===0)
        {
            res.send({
                message: "Story doesn't exists."
            })
        }
        res.send({
            message: "Story deleted successfully."
        })
    }).catch((error) =>{
        res.send({
            message: error.message
        })
    })
})

router.put('/updatestory',(req ,res) =>{
    Story.updateOne(
        {
            _id:req.body.id
        },
        {
            $set : {
                ...req.body
            }
        }
    ).then((data) =>{
        Story.findOne({_id:req.body.id}).then((DATA) =>{
            if(DATA!=null)
            {
                res.send({
                    message : "Story updated successfully.",
                    DATA
                })
            }
            else
            {
                res.send({
                    message : "Story not exist with given id."
                })
            }
        }).catch((error) =>{
            res.send({
                error : error.message
            })
        })
    }).catch((error) =>{
        res.send({
            error : error.message
        })
    })
})

router.get('/searchstory', (req, res) =>{
    Story.findOne({_id:req.body.id}).then((data) =>{
        if(data)
        {
            res.send(data)
        }
        else
        {
            res.send({
                message : "Story doesnt exists with id."
            })
        }
    }).catch((error) => {
        res.send({
            error : error.message
        })
    })
})
// router.get('/', (req, res) => 
// {
//     res.send(story)
// })


// router.post('/createstory',(req, res) =>
// {   
//     var flag=0
//     story.map((iterator) =>
//     {
//         if(iterator.id===req.body.id)
//         {
//             flag++
//             res.send("Story already Exists.")
//         }
//     })
//     if(flag===0)
//     {
//         story.push(req.body)
//         res.send("Story posted successfully.")
//     }    
          
// })

// router.delete('/deletestory',(req, res) => 
// {
//     var flag=0
//     story.map((iterator,i) =>
//     {
        
        
//         if(iterator.id===req.body.id)
//         {
//             flag++
//             story.splice(i,1)
//             res.send("Story deleted successfully.")
//         }
//     })
//     if(flag===0)
//     {
//         res.send("Story doesn't exists.")
//     }  

// }
// )

// router.put('/updatestory', (req, res) =>
// {
//     var i 
//     flag = 0
//     for(i=0 ; i<story.length ; i++)
//     {
//         if(story[i].id===req.body.id)
//         {
//             flag++
//             story[i].description=req.body.description
//             res.send("Description updated successfully.")
//         }
//     }
//     if(flag==0)
//     {
//         res.send("Story doesn't exists to update.")
//     }

// })



module.exports = router