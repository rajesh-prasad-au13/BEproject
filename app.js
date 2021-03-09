const express = require("express");
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
// const passportSetup = require('./config/passport-setup');
// const mongoose = require('mongoose');
const keys = require('./config/keys');
const path = require('path')
const employeeRouter = require('./controllers/employeeController')
// const exphbs = require('express-handlebars')
const hbs = require('hbs')
const bodyparser = require('body-parser')

const adminSignup = require('./controllers/adminSignupController')
const adminLogin = require('./controllers/adminloginController')
const home = require('./controllers/adminhomePage')

// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');
// const { check, validationResult } = require('express-validator')

const dotenv = require("dotenv");
dotenv.config();

const auth = require('./routes/authLogin')

// const router = express.Router()
// const cloudinary = require("./utils/cloudinary");
// const upload = require("./utils/multer");
// const Employee = require("./src/models/employeeschema");
// const employeeGoogle= require("./src/models/employeeGoogleSigninSchema");

require('./controllers/employeeController')
require("./src/db/conn")

const port = 5000

const static_path = path.join(__dirname, "./public")
const template_path = path.join(__dirname, "./templates/views")
const partials_path = path.join(__dirname, "./templates/partials")
hbs.registerPartials(partials_path)

// app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));

app.use(express.static(static_path))

app.set("view engine", "hbs");
app.set('view engine', 'ejs');
app.set("views", template_path)


app.use('/', adminSignup)
app.use('/', adminLogin)
app.use('/', home)
app.use('/user', require('./cloudinary_image_upload/routes/user'))
app.use('/employee', employeeRouter)


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true})) 

// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


// create home route
app.get('/', (req, res) => {
    console.log('req.user',req.user)
    res.render('home.ejs', { user: req.user });
});


app.get('/see', auth, (req, res) => {
    res.json("Welcome to Your Profile Section")
});


app.listen(port, () => {
  console.log(`Server running at ${port}`) //5000
})


