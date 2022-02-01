const router = require('express').Router();
const {check} = require('express-validator'); 
const { addUser } = require('../controllers/userController');
const { existEmail } = require('../helpers/db-validators');
const { validateUser } = require('../middlewares/validateUser');


//crear usuario
router.post('/',[
    check('email','Email is required.').isEmail(),
    check('password','Password is required.').not().isEmpty(),
    check('name','Name is required.').not().isEmpty(),
    check('email').custom(existEmail),
    validateUser
], addUser);

module.exports = router;