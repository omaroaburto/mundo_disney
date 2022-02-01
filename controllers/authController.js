const db = require('../models');
const bcryptjs =  require('bcryptjs');
const { createJWT } = require('../helpers/create-jwt');
const User = db.users;

const login = async (req,res)=>{
    const {email, password} = req.body; 
    const user = await User.findOne({ where: { user_email: email } });
    if(!user){
        res.status(400).json({ 
            msg:"Invalid email/password"
        });
    }  
    const validatePassword = bcryptjs.compareSync(password, user.user_password);
    if(!validatePassword){
        return res.status(400).json({
            msg:'Invalid email/password'
        });
    } 
    
    try {
        const token = await createJWT(user.user_id);
        res.status(500).json({
            user: user.user_name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador' 
        });
    }
}
module.exports = {
    login
}