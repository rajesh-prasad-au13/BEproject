const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
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
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now()
    // }
})

module.exports = mongoose.model("admin",adminSchema);