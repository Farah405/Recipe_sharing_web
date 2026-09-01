const jwt = require("jsonwebtoken")


exports.validateToken = (req, res, next)=>{
    const token = req.headers.authorization
    if(!token) {
        return res.status(401).json({msg:"Token is not Found Try Again!!"})
    }
    try{ 
        const payload= jwt.verify(token,process.env.SECRET_KEY)
        req.user = payload
        next()
    }
    catch(err){
        next(err)
    }

}