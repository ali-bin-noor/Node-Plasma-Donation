const jwt = require('jsonwebtoken')
const jwtsecret = require('../../config/').jwtsecret

const isLoggedIn = (req, res , next) => {

    const token = req.headers['x-access-token']
    if(!token)
    {
        res.send({
            message : " Wrong access token"
        })
    }
    else
    {
        try
        {
        const payload = jwt.verify(token, jwtsecret)
        if(payload.data.email===req.body.email)
        {
            next()
        }
        else
        {
            res.send({
                message : " Wrong access token"
            })
        }
        }
        catch(error)
        {
            res.send(({
                message : error.message
            }))
        }

    }
}

module.exports = isLoggedIn