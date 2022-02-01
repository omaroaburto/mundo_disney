
const db = require('../models');
const bcryptjs =  require('bcryptjs');

const User = db.users;

const addUser = async(req,res)=>{ 
    try {
        const salt = bcryptjs.genSaltSync();  
        let password = bcryptjs.hashSync(req.body.password, salt)
 
        let infoUser = {
            user_name: req.body.name,
            user_email: req.body.email,
            user_password: password,
        };
        const user = await User.create(infoUser)
            .then(()=>{
                const { sendEmail } = require('../helpers/sendEmail');
                sendEmail(infoUser.user_email, infoUser.user_name)
            });
        
        res.status(200).json({
            user,
            msg:"user has been created"
        }); 
    } catch (error) {
        res.status(400).json({ 
            msg: (error.parent.code == 23505)?'The email is already registered':'database error'
        });
    }
    
}

module.exports ={
    addUser
}