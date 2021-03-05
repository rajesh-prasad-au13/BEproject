const express = require("express");
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const path = require('path')
const hbs = require('hbs')
const bodyparser = require('body-parser')
const mySchema = require("./src/models/schema")
const dotenv = require("dotenv");
dotenv.config();
require("./src/db/conn")
const port = process.env.PORT || 3000

let admin = []

const static_path = path.join(__dirname, "./public")
const template_path = path.join(__dirname, "./templates/views")
const partials_path = path.join(__dirname, "./templates/partials")
hbs.registerPartials(partials_path)


app.use(express.static(static_path))

app.set("view engine", "hbs")
app.set('view engine', 'ejs');
app.set("views", template_path)


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true})) 
// Route
app.use('/user', require('./cloudinary_image_upload/routes/user'))
// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
// mongoose.connect(keys.mongodb.dbURI, () => {
//   console.log('connected to mongodb');
// });

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home.ejs', { user: req.user });
});


app.get('/signup',(req,res) => {
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


app.post('/signup',(req,res) => {
    console.log(__dirname+'/signup.hbs');
    console.log(req.body);
    const error = {}
    const data = {
        title:"SignUP",
        ...req.body
    }
    if(!req.body.firstname){
        error.firstname = 'Please Enter First Name'
        res.render(template_path+'/signup.hbs',{...data,error})    //.hbs extension is not required
        return
    }
    if(req.body.password != req.body.confirm_password){
        error.password = 'Password Mismatch'
        data.password = ''
        data.confirm_password = ''
        res.render(template_path+'/signup.hbs',{...data,error})
        return
    }
    admin.push(req.body);
    console.log(req.body)
    console.log('running here')
    res.redirect('/admins')
})

app.get('/admins',(req,res) => {
    console.log(admin)
    res.json(admin)
})

app.post('/admins', async (req,res) => {
    console.log('heree')
    try{
        if(req.body.password == req.body.confirm_password){
            const registerEmployee = new mySchema({
                firstname : req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:req.body.password,
                confirm_password:req.body.confirm_password
            })
            const result = await registerEmployee.save()
            console.log(result,registerEmployee,req.body.firstname)
            res.status(201).render('index.hbs')
        }
        else{
            res.send("Password Mismatched")
        }
    }
    catch(error){
        res.status(400).send(error)
    }
})

// app.get("/", (req,res) => {
//     res.render("index.hbs")
// })

app.listen(port, () => {
  console.log(`Server running at ${port}`) //3000
})








// // set view engine
// app.set('view engine', 'ejs');

// // set up session cookies
// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [keys.session.cookieKey]
// }));

// // initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

// // connect to mongodb
// mongoose.connect(keys.mongodb.dbURI, () => {
//     console.log('connected to mongodb');
// });

// // set up routes
// app.use('/auth', authRoutes);
// app.use('/profile', profileRoutes);

// // create home route
// app.get('/', (req, res) => {
//     res.render('home', { user: req.user });
// });

// app.listen(5000, () => {
//     console.log('app now listening for requests on port 5000');
// });