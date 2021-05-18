const express = require ('express')
const post = require ('../staticData/post')
// const { map } = require ('../staticData/user')
const router = express.Router()

router.get('/', (req, res) =>
{
    res.send(post)
})

router.post('/createpost', (req, res) =>
{
    var flag = 0
    post.map((iterator) =>
    {
        if(iterator.Mob===req.body.Mob)
        {
            flag++
            res.send("Post already exists")
        }
    })
    if(flag===0)
    {
    post.push(req.body)
    res.send("Post sent Successfully")
    } 
  
})

router.delete('/deletepost',(req, res) =>
{

    var flag = 0
    post.map((iterator,i) =>
    {
        if(iterator.Mob===req.body.Mob)
        {
            flag++
            post.splice(i,1)
            res.send("Post deleted successfully.")
        }
    })
    if(flag===0)
    {
        res.send("Post doesn't exists.")
    }  

}
)

router.put('/updatepost', (req, res) =>
{
    var i 
    flag = 0
    for(i=0 ; i<post.length ; i++)
    {
        if(post[i].Mob===req.body.Mob)
        {
            flag++
            post[i].bloodGroup=req.body.bloodGroup
            res.send("Bloadgroup updated successfully.")
        }
    }
    if(flag==0)
    {
        res.send("Wrong Mobile number")
    }

})


module.exports=router