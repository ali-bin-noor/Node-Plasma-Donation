const express = require('express')
const { map } = require('../staticData/user')
const router = express.Router()
const user = require('../staticData/user')

router.get('/', (req, res) => 
{
    res.send(user)
})

router.post('/createuser', (req, res) =>
{   
    var flag=0
    user.map((iterator) =>
    {
        if(iterator.email===req.body.email)
        {
            flag++
            res.send("Donor already Exists.")
        }
    })
    if(flag===0)
    {
        user.push(req.body)
        res.send("Donor account created successfully.")
    }    
          
})

router.delete('/deleteuser',(req, res) =>
{
    
    var flag=0
    user.map((iterator,i) =>
    {
        if(iterator.email===req.body.email)
        {
            flag++
            user.splice(i,1)
            res.send("Donor deleted successfully.")
        }
    })
    if(flag===0)
    {
        res.send("Donor doesn't exists.")
    }  

}
)

router.put('/updateuser', (req, res) =>
{
    
    var i
    var flag = 0 
    for(i=0; i<user.length; i++)
    {
        if(user[i].email === req.body.email)
        {
            flag = 1
            user[i].Mob=req.body.Mob
            res.send("Details updated successfully.")
                      
        }
    }
    if(flag === 0)
    {
        res.send("Wrong Email")

    } 

})


router.put('/forgetpassword', (req, res) =>
{
    
    var i
    var flag = 0 
    for(i=0; i<user.length; i++)
    {
        if(user[i].email === req.body.email)
        {
            flag = 1
            user[i].password=req.body.password
            res.send("Password updated successfully.")
                      
        }
    }
    if(flag === 0)
    {
        res.send("Wrong Email")

    } 

})


module.exports=router