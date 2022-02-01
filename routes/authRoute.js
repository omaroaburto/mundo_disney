const router = require('express').Router();
const {check} = require('express-validator'); 
const { login } = require('../controllers/authController');
const { validateUser } = require('../middlewares/validateUser');


//crear usuario
router.post('/',[
    check('email','Email is required.').isEmail(),
    check('password','Password is required.').not().isEmpty(), 
    validateUser
], login);

module.exports = router;