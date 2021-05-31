const express = require ('express')
const post = require ('../staticData/post')
const Post = require('../models/Post')
const isLoggedIn = require('../middleware')
// const { map } = require ('../staticData/user')
const router = express.Router()

router.get('/',(req, res) =>{
    Post.find().populate('donorId',['name','email','bloodGroup','address','mobile','reportsDates']).then((data) =>{
     res.send(data)

    }).catch((error) =>{
        res.send({
            message: error.message
        })
    })
})

router.post('/createpost', isLoggedIn , (req, res) =>{
    Post.findOne({donorId:req.body.id}).then((data) =>{
        if(data)
        {
            res.send({
                message: "Post already exists"
            })
        }
        else
        {
            const post = new Post({
                donorId:req.body.id
               
            })
            post.save().then((data) =>{
                res.send({
                    message:"Post created successfully.",
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
            message:error.message
        })
    })
})

router.delete('/deletepost', isLoggedIn , (req, res) =>{
    
    Post.remove({donorId:req.body.id}).then((data) =>{
    
        if(data.deletedCount===0)
        {
            res.send({
                message: "Post doestn't exists"
            })
        }
        
        res.send({
            message: "Post deleted successfully."
        })
    }).catch((error) =>{
        res.send({
            message: error.message
        })
    })
})

// router.put('/updatepost', isLoggedIn , (req, res) =>{
//     Post.updateOne(
//         {
//             donorId:req.body.id
//         },
//         {
//             $set : {
//                 ...req.body
//             }
//         }
//     ).then((data) =>{
//         Post.findOne({donorId:req.body.id}).then((data) =>{
//             if(data)
//             {
//                res.send({
//                    message: "Post updated successfully."
//                }) 
//             }
//             else
//             {
//                 res.send({
//                     message : "Post doesn't exists with id."
//                 })
//             }
//         }).catch((error) =>{
//             res.send({
//                 error : error.message
//             })
//         })
//     }).catch((errror) =>{
//         res.send({
//             errror : error.message
//         })
//     })
// })

router.get('/searchpost', isLoggedIn , (req, res) =>{
    Post.findOne({donorId:req.body.donorId}).populate('donorId',['name','email','bloodGroup','address','mobile','reportsDates']).then((data) =>{
        if(data)
        {
            res.send(data)
        }
        else
        {
            res.send({
                message : "Post not available with id."
            })
        }
    }).catch((error) =>{
        res.send({
            error : error.message
        })
    })
})

// router.get('/', (req, res) =>
// {
//     res.send(post)
// })

// router.post('/createpost', (req, res) =>
// {
//     var flag = 0
//     post.map((iterator) =>
//     {
//         if(iterator.Mob===req.body.Mob)
//         {
//             flag++
//             res.send("Post already exists")
//         }
//     })
//     if(flag===0)
//     {
//     post.push(req.body)
//     res.send("Post sent Successfully")
//     } 
  
// })

// router.delete('/deletepost',(req, res) =>
// {

//     var flag = 0
//     post.map((iterator,i) =>
//     {
//         if(iterator.Mob===req.body.Mob)
//         {
//             flag++
//             post.splice(i,1)
//             res.send("Post deleted successfully.")
//         }
//     })
//     if(flag===0)
//     {
//         res.send("Post doesn't exists.")
//     }  

// }
// )

// router.put('/updatepost', (req, res) =>
// {
//     var i 
//     flag = 0
//     for(i=0 ; i<post.length ; i++)
//     {
//         if(post[i].Mob===req.body.Mob)
//         {
//             flag++
//             post[i].bloodGroup=req.body.bloodGroup
//             res.send("Bloadgroup updated successfully.")
//         }
//     }
//     if(flag==0)
//     {
//         res.send("Wrong Mobile number")
//     }

// })


module.exports=router