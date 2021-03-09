const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login.hbs');
  });
  
  
router.post('/login',(req,res) => {
    console.log(req.body)
    console.log(req.header.token)
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("employees");
    dbo.collection("admins").findOne({}, function(err, result) {
        if (err) throw err;

        console.log(req.body.password, result.password)
        if(result){
            jwt.sign(
                { result: { email: result.email } },
                'jwt_secret',
                (err, token) => {
                    if (err) throw err;
                    console.log('token',token)
                    req.header.token = token
                    console.log('heree')
                    res.status(200).json({
                        data: {token},
                        errors:[],
                        message: 'Loggin success!!'
                    })
                }
            )
            db.close();
        }
        else{
            res.status(200).json({
                data: {},
                // errors:[],
                message: 'No such User'
            })
            db.close();
        }
    });
    });
    // res.end()
} );

  module.exports = router