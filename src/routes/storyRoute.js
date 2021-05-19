const story = require('../staticData/story')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => 
{
    res.send(story)
})


router.post('/createstory',(req, res) =>
{   
    var flag=0
    story.map((iterator) =>
    {
        if(iterator.id===req.body.id)
        {
            flag++
            res.send("Story already Exists.")
        }
    })
    if(flag===0)
    {
        story.push(req.body)
        res.send("Story posted successfully.")
    }    
          
})

router.delete('/deletestory',(req, res) => 
{
    var flag=0
    story.map((iterator,i) =>
    {
        
        
        if(iterator.id===req.body.id)
        {
            flag++
            story.splice(i,1)
            res.send("Story deleted successfully.")
        }
    })
    if(flag===0)
    {
        res.send("Story doesn't exists.")
    }  

}
)

router.put('/updatestory', (req, res) =>
{
    var i 
    flag = 0
    for(i=0 ; i<story.length ; i++)
    {
        if(story[i].id===req.body.id)
        {
            flag++
            story[i].description=req.body.description
            res.send("Description updated successfully.")
        }
    }
    if(flag==0)
    {
        res.send("Story doesn't exists to update.")
    }

})



module.exports = router