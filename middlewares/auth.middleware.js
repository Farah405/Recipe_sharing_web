const jwt = require("jsonwebtoken")
require("dotenv").config({ path: "../config.env" })

exports.validateToken = (req, res, next)=>{
    const token = req.headers.authorization
    if(!token) {
        return res.status(401).json({msg:"Token is not Found Try Again!!"})
    }
    try{ 
        const payload= jwt.verify(token,process.env.secret_key)
        req.user = payload
        next()
    }
    catch(err){
        next(err)
    }

}