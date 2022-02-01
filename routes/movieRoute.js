const router = require('express').Router();
const {check, param } = require('express-validator'); 
const { addMovies, findAllMovies } = require('../controllers/movieController');
const { validateRating } = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/validateJwt');
const { validateMovie } = require('../middlewares/validateMovie');


router.post('/',[
    check('name')
        .notEmpty()
        .withMessage('name is required.')
        .isLength({min: 1,max:50})       
        .withMessage('name must be between 1 and 50 characters')
        .matches(/^[A-Za-z0-9 ,.:ñÑáéíóúÁÉÍÓÚ'!&]+$/),
    check('date')
        .notEmpty()
        .withMessage('date is required.')
        .isDate({format: 'DD-MM-YYYY'})
        .withMessage('invalid date format.'),
    check('rating')
        .notEmpty()
        .withMessage('rating is required.')
        .isNumeric({no_symbols: false})
        .withMessage('rating is a number')
        .custom(validateRating), 
    validateMovie,   
    validateJWT
], addMovies);

router.get('/', findAllMovies);
module.exports = router;