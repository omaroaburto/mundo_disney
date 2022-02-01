const db = require('../models');
const User = db.users;
const Character = db.characters
//helper para validar si el email está registrado en la base de datos
const existEmail = async (email)=>{
    const user = await User.findOne({ where: { user_email: email } }); 
    if (user) {
        throw new Error(`El correo ${email} ya está registrado`);   
    } else {
      return true;
    }
}

const existIdCharacter = async (id)=>{
    const character = await Character.findByPk(id); 
    if (character) {
        throw new Error(`El id ${id} no existe`);   
    } else {
      return true;
    }
}

const validateRating = async (rating)=>{ 
    if (rating<1 || rating>5) {
        throw new Error(`the movies rating should be between 1 and 5`);   
    } else {
      return true;
    }
}

module.exports = {
    existEmail,
    existIdCharacter, 
    validateRating
}