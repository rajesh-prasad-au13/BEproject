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
    }
})

const userSchema = mongoose.Schema({
    username: String,
    useremail: String,
    googleId: String,
    thumbnail: String
});

module.exports = mongoose.model('user', userSchema);    //google login

// module.exports = mongoose.model("Register", adminSchema);     //form login or signup