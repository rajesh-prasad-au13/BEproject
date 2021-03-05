const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    confirm_password:{
        type:String,
        require:true
    }
})

// const Register = 
module.exports = mongoose.model("Register", employeeSchema)