const jwt = require('jsonwebtoken'); 
const db = require('../models');
const User = db.users;

const validateJWT = async (req, res, next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(400).json({
            msg:"invalid token"
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
        const user = await User.findByPk(uid); 
        if(!user){
            return res.status(401).json({
                msg: "invalid token"
            });
        } 
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg:"invalid token"
        });
    }
}

module.exports = {
    validateJWT
}