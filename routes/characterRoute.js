const router = require('express').Router();
const { check, param } = require('express-validator'); 
const { addCharacter, updateCharacter, disableCharacter, findCharacter, enableCharacter, findIdCharacter } = require('../controllers/characterController');
const { existIdCharacter, validateMoviesList, validateMovie } = require('../helpers/db-validators');
const { validateCharacter } = require('../middlewares/validateCharacter');
const { validateJWT } = require('../middlewares/validateJwt');

//agregar personaje
router.post('/',[
        check('name')
            .notEmpty()
            .withMessage('name is required.')
            .isLength({min: 1,max:50})       
            .withMessage('name must be between 1 and 50 characters')
            .matches(/^[A-Za-z0-9 ñÑáéíóúÁÉÍÓÚ'!&]+$/),
        check('age')
            .notEmpty()
            .withMessage('age is required.')
            .isNumeric(),
        check('weight')
            .notEmpty()
            .withMessage('age is required.')
            .isNumeric(), 
        check('story')
            .notEmpty()
            .withMessage('story is required.')
            .isLength({min: 1,max:1000})       
            .withMessage('story must be between 1 and 1000 characters')
            .matches(/^[A-Za-z0-9 ñÑáéíóúÁÉÍÓÚ.,'!&]+$/),
        query('movies')
            .custom(validateMoviesList),
        validateCharacter,
        validateJWT
    ], addCharacter
);

//actualizar personaje
router.put('/:id',[
    param('id')
        .isNumeric()
        .custom(existIdCharacter)
        .withMessage('invalid id'),
    check('name')
        .notEmpty()
        .withMessage('name is required.')
        .isLength({min: 1,max:50})       
        .withMessage('name must be between 1 and 50 characters')
        .matches(/^[A-Za-z0-9 ñÑáéíóúÁÉÍÓÚ'!&]+$/),
    check('age')
        .notEmpty()
        .withMessage('age is required.')
        .isNumeric(),
    check('weight')
        .notEmpty()
        .withMessage('age is required.')
        .isNumeric(), 
    check('story')
        .notEmpty()
        .withMessage('story is required.')
        .isLength({min: 1,max:1000})       
        .withMessage('story must be between 1 and 1000 characters')
        .matches(/^[A-Za-z0-9 ñÑáéíóúÁÉÍÓÚ.,'!&]+$/),
    validateJWT,
    validateCharacter
], updateCharacter
);

//desactivar personaje
router.delete('/:id',[
    param('id')
        .isNumeric()
        .custom(existIdCharacter)
        .withMessage('invalid id'),
    validateJWT,
    validateCharacter
], disableCharacter);

//activar personaje
router.post('/:id',[
    param('id')
        .isNumeric()
        .custom(existIdCharacter)
        .withMessage('invalid id'),
    validateJWT,
    validateCharacter
], enableCharacter);

//listar personaje por distintos filtros
router.get('/',[
    query('movies')  
        .custom(validateMovie),
    validateJWT,
    validateCharacter
], findCharacter)

router.get('/:id',[
    param('id')
        .isNumeric()
        .custom(existIdCharacter)
        .withMessage('invalid id'),
    validateCharacter,
    validateJWT
], findIdCharacter);



module.exports = router