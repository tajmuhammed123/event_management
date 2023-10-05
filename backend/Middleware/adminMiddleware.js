const jwt = require('jsonwebtoken');
const User=require('../Models/userModels')
require('dotenv').config();

const adminAuth = async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        if (req.headers.authorization) {
            console.log(req.headers.authorization);
            let token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JwtSecretKey);
            console.log(decoded);
            const user = await User.findOne({ _id: decoded.userId });
            console.log(user);
            if (user) {
                next();
            }else{
                console.log('not a user');
                return res.status(403).json({message:'Not a user'})
            }
        }
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    adminAuth
};
