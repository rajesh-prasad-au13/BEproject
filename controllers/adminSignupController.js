const express = require('express')
const router = express.Router()
const path = require('path')
const mySchema = require("../src/models/adminschema")
let admin = []
const template_path = path.join(__dirname, "../templates/views")

router.get('/signup',(req,res) => {
    const data = {
        admin,
        firstname: '',
        lastname:'',
        email: '',
        password: '',
        confirm_password:''
      }
    res.render(template_path +'/signup.hbs',data);      //.hbs extension is not required
})


router.post('/signup', async (req,res) => {
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         data: {},
    //         errors: errors.array(),
    //         message: 'Unable to create user'
    //     });
    // }
    // try {
    //     let user = await User.findOne({ email: req.body.email });
    //     if (user) {
    //         return res.status(400).json({
    //             data: {},
    //             errors: [{
    //                 value: req.body.email,
    //                 msg: "User already exists.",
    //                 param: "email",
    //                 location: "body"
    //             }],
    //             message: 'Unable to create user'
    //         })
    //     }
    //     user = new User({
    //         firstName: req.body.firstName,
    //         lastName: req.body.lastName || '',
    //         email: req.body.email
    //     });
    //     const salt = await bcrypt.genSalt(10);
    //     user.password = await bcrypt.hash(req.body.password, salt);

    //     await user.save();

    //     res.status(200).json({
    //         data: user,
    //         errors: [],
    //         message: 'Signed Up successfully!!'
    //     });
    // } catch (e) {
    //     console.log(e.message);
    //     res.status(500).send('Error in Saving');
    // }
    console.log(req.body,req.body.password == req.body.confirm_password)
    try{
        if(req.body.password == req.body.confirm_password){
            console.log("here")
            const registerEmployee = new mySchema({
                firstname : req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:req.body.password
            })
            console.log(registerEmployee)

            const salt = await bcrypt.genSalt(10);
            // console.log(salt)
            registerEmployee.password = await bcrypt.hash(req.body.password, salt); 
            console.log(salt, registerEmployee.password)

            const result = await registerEmployee.save()

            res.status(200).json({
                data: user,
                // errors: [],
                message: 'Signed Up successfully!!'
            });

            // res.status(201).render('signup.hbs')
        }
        else{
            res.send("Password Mismatched")
        }
    }
    catch(error){
        res.status(400).send(error)
    }
} )


module.exports = router