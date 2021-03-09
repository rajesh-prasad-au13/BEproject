const express = require('express')
const router = express.Router()
var MongoClient = require('mongodb').MongoClient;

router.get('/home', (req, res) => {
    // console.log(req.body)
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("employees");
    dbo.collection("admins").findOne({}, function(err, result) {
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

module.exports = router