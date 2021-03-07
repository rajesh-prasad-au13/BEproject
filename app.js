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
const employeeRouter = require('./controllers/employeeController')
const exphbs = require('express-handlebars')
const hbs = require('hbs')
const bodyparser = require('body-parser')
const mySchema = require("./src/models/adminschema")
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router()
const cloudinary = require("./utils/cloudinary");
const upload = require("./utils/multer");
const Employee = require("./src/models/employeeschema");
// const employeeGoogle= require("./src/models/employeeGoogleSigninSchema");

require('./controllers/employeeController')
require("./src/db/conn")
// require('./src/db/db')
const port = 5000

var MongoClient = require('mongodb').MongoClient;

// let users = []

let admin = []

const static_path = path.join(__dirname, "./public")
const template_path = path.join(__dirname, "./templates/views")
const partials_path = path.join(__dirname, "./templates/partials")
hbs.registerPartials(partials_path)

// app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));

app.use(express.static(static_path))

app.set("view engine", "hbs")
app.set('view engine', 'ejs');
app.set("views", template_path)

app.use('/employee', employeeRouter)
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
    // console.log(req)
    res.render('home.ejs', { user: req.user });
});

app.get('/home', (req, res) => {
    console.log(req.body)
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("employees");
    dbo.collection("registers").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result)
        
        //object to array
        const propertyNames = Object.values(result);
        console.log(propertyNames);
        const data = {propertyNames}
        
        console.log(data)
        res.render('home.hbs',data) 
        
        db.close()
       });
    });
    // res.end() 
});


app.get('/login', (req, res) => {
  res.render('login.hbs');
});


app.post('/login', (req,res) => {
    console.log(req.body)
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("employees");
    dbo.collection("registers").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(req.body.password, result.password)
        if(result){
            if(req.body.password == result.password){
                console.log("Login Success")
            }
            else{
                console.log("Login Failed")
            }
            db.close();
        }
        else{
            console.log("No such User")
            db.close();
        }
    });
    });
    res.end()
} );


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


app.post('/signup', async (req,res) => {
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
            
            res.status(201).render('signup.hbs')
            // alert("Done");
        }
        else{
            res.send("Password Mismatched")
        }
    }
    catch(error){
        res.status(400).send(error)
    }
} )


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





// router.get('/', (req, res) => {
//     res.render("employee/add-edit-employee", {
//         viewTitle: "Insert Employee"
//     });
// });


// router.post("/employee", upload.single("image"), async (req, res) => {
//   try {
//     // Upload image to cloudinary
//     console.log(req.body)
//     // console.log(res)
//     const result = await cloudinary.uploader.upload(req.file.path);
//     // res.json(result)
//     // Create new user
//     // console.log(req.body)
//     let employee = new Employee({
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       email: req.body.email,
//       phone: req.body.email,
//       phone: req.body.address,
//       pancard: req.body.pancard,
//       cloudinary_id: result.secure_url,
//       basicsalary: req.body.basicsalary,
//       da: req.body.da,
//       hra: req.body.hra,
//       medical: req.body.medical,
//       proftax: req.body.proftax,
//       incometax: req.body.incometax,
//       providentfund: req.body.providentfund
//     });
//     // Save user
//     await employee.save();
//     res.json(employee);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(port, () => {
  console.log(`Server running at ${port}`) //5000
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