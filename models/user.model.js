const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String, required:[true, "Name Is Required"], 
        minlength:[3,"name must be atleast 3 characters"],
        maxlength:[30,"name must be less than 30 characters" ],
        match:[/^[A-Za-z\s]+$/,"Name must contain only letters"]
    },
    email:{type:String, required:[true,"email is required"],
    unique:[true, "This Email is exist please enter another email"],
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,"Please Enter a valid mail"]
    },
    password:{type:String, required:[true, "Password is required"] ,
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Enter Strong Password"]
    },
    confirmPassword:{type:String, required:[true, "Confirm Password is required"] ,
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Enter Strong Password"]
    },
    age:{type:Number,
            match:[/^[0-9]{2}$/,"Enter a valid age"]
    },
},{timestamps:true})

userSchema.pre('save',async function(){
    try{
        if(this.password !== this.confirmPassword){
            throw  new Error("Your Password & Your Confirm Password are not match")
        }
    }
    catch(err){
        next(err)
    }
})

module.exports = mongoose.model("user",userSchema)

