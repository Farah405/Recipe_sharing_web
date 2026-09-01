const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.register = async(req, res, next)=>{
try{
    const {
        name, 
        email, 
        password, 
        confirmPassword
    } = req.body
    const user = new User({
        name, 
        email, 
        password, 
        confirmPassword
    })
    await user.save()
    const token = jwt.sign({
        id:user._id, 
        name:user.name, 
        email:user.email
    }, process.env.SECRET_KEY,
        {
            expiresIn:"15m"
        }
    )
        res.status(201).json({
            user:user, 
            token:token
        })
}
    catch(err){
        next(err)
    }
}

exports.login = async(req, res, next)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return  res.status(400).json({msg:"Invalid Data: This email is not found"})
        }

        if(! await bcrypt.compare(password,user.password)){
            return  res.status(400).json({msg:"Invalid Data"})
        }
        const token = jwt.sign({id:user._id, name:user.name, email:user.email},process.env.SECRET_KEY,
        {
            expiresIn:"15m"
        }
    )
        res.status(200).json({token})
    }
    catch(err){
        next(err)
    }
}