//this is a middleware component which we can use to write the same fucntion over different routes in an application

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'pulkitisaG00dB0y';

const fetchuser = (req, res, next)=>{
    //get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "please authenticate using a valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "please authenticate using a valid token"})
    }
    
}

module.exports = fetchuser;