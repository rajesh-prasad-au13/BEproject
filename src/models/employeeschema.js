const mongoose = require('mongoose')
const validator = require('validator')
var employeeSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:[true,"Enter the firstname"]
    },
    lastname : String,
    email : {
        type: String,
        required: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error ("Email is inValid")
            }
        }

        // validate(value){
        //     if(value<0){
        //         throw new Error("Check the email you entered")
        //     }
        // }
    },
    phone : {
        type: String,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value)) {
                throw new Error("Mobile number is inValid")
            }
        }
    },
    address: String,
    pancard : {
        type: String,
        required: [true,"enter the pancard number"]
    },
    cloudinary_id: String,
    basicsalary : {
        type: Number,
        required: true,
            validate(value){
                if(validator.isLength(value)<=6){
                    throw new Error("CHeck the number of digits entered")
                }
            }
    },
    da: {
        type: Number,
        required: true,
        validate(value){
            if(validator.isLength(value)<=4){
                throw new Error("CHeck the number of digits entered")
            }
        }
    },
    hra : {
        type: Number,
        required: true,
        validate(value){
            if(validator.isLength(value)<=4){
                throw new Error("CHeck the number of digits entered")
            }
        }
    },
    medical : {
        type : Number,
        required: true,
        validate(value){
            if(validator.isLength(value)<=4){
                throw new Error("CHeck the number of digits entered")
            }
        }
    },
    proftax : {
        type: Number,
        required: true,
        validate(value){
            if(validator.isLength(value)<=3){
                throw new Error("CHeck the number of digits entered")
            }
        }
    },
    incometax : {
        type: Number,
        enum: [10, 20, 30],
        required : true
    },
    providentfund : {
        type: Number,
        required: true,
        validate(value){
            if(validator.isLength(value)<=4){
                throw new Error("CHeck the number of digits entered")
            }
        }
    }
})

module.exports = mongoose.model('new',employeeSchema)