const mongoose = require('mongoose')

var employeeSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:true
    },
    lastname : {
        type:String,
        required:true
    },
    email : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required:false
    },
    address: String,
    pancard : {
        type: String,
        required: false
    },
    cloudinary_id: String,
    basicsalary : {
        type: Number,
        required: false,
    },
    da: {
        type: Number,
        required: false,
    },
    hra : {
        type: Number,
        required: false
    },
    medical : {
        type : Number,
        required: false
    },
    proftax : {
        type: Number,
        required: false,
    },
    incometax : {
        type: Number,
        enum: [10, 20, 30],
        required : false
    },
    providentfund : {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('new',employeeSchema)