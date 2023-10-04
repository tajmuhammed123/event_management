const jwt = require('jsonwebtoken');
const User=require('../Models/userModels')
require('dotenv').config();

const userAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            console.log(req.headers.authorization);
            let token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JwtSecretKey);
            console.log(decoded);
            const user = await User.findOne({ _id: decoded.userId });
            console.log(user);
            if (user) {
                next();
            }
        }
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    userAuth
};
