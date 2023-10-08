const jwt = require('jsonwebtoken');
const User=require('../Models/userModels')
require('dotenv').config();

const userAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            console.log(req.headers.authorization);
            let token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JwtSecretKey);
            if(decoded=='jwt expired'){
                return res.status(403).json({message:'user expired'})
            }
            console.log(decoded);
            const user = await User.findOne({ _id: decoded.userId });
            req.user=user
            console.log(user);
            if (user) {
                next();
            }else{
                res.send('Not a user')
            }
        }
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    userAuth
};
