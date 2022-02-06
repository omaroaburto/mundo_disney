const router = require('express').Router();
const {check, param, query } = require('express-validator'); 
const { addMovies, findAllMovies, disableMovies, enableMovies, findIdMovies } = require('../controllers/movieController');
const { validateRating, validateGenreList, validateGenre } = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/validateJwt');
const { validateMovie } = require('../middlewares/validateMovie');

//crear película
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
    check('genre')
        .custom(validateGenreList),
    validateMovie,   
    validateJWT
], addMovies);


//actualizar película
router.put('/:id',[
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
    param('id')
        .isNumeric()
        .withMessage('invalid id'),
    validateMovie,   
    validateJWT
], addMovies);

//desactivar película
router.delete('/:id',[
    param('id')
        .isNumeric()
        .withMessage('invalid id'),
    validateMovie,   
    validateJWT
],disableMovies);

//activar película
router.post('/:id',[
    param('id')
        .isNumeric()
        .withMessage('invalid id'),
    validateMovie,   
    validateJWT
],enableMovies)
//buscar película
router.get('/',[
    query('genre')  
        .custom(validateGenre),
    validateMovie,
    validateJWT
], findAllMovies);
//buscar película por id
router.get('/:id',[
    param('id')
        .isNumeric()
        .withMessage('invalid id'),
    validateMovie,
    validateJWT
], findIdMovies);

module.exports = router;