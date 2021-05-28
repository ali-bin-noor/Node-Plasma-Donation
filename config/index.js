require('dotenv/config')



module.exports= 
{
    mongoURL: process.env.MONGO_URL,
    jwtsecret : process.env.JWT_SECRET

}
