const jwt = require('jsonwebtoken');

const auth = function (req,res,next) {
    const token = req.header.token;
    console.log(req.header)
    if(!token) return res.status(401).json(
        {
            message: 'Please login!!', 
            // error:[],
            data:{}}
        );
    try {
        console.log(req.header)
        const decoded = jwt.verify(token,'jwt_secret');
        console.log("decoded",decoded)
        // req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(403).json({
            message: 'Invalid Token!!',
            //  error:[],
             data:{}});
    }
}

module.exports = auth;
