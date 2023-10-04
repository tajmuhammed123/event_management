const jwt = require('jsonwebtoken');
const Manager=require('../Models/managerModel')
require('dotenv').config();

const managerAuth = async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        if (req.headers.authorization) {
            console.log(req.headers.authorization);
            let token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JwtSecretKey);
            console.log(decoded);
            const user = await Manager.findOne({ _id: decoded.userId });
            if (user) {
                next();
            }
        }
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    managerAuth
};
