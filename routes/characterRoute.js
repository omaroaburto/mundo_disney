const router = require('express').Router();
const { check, param } = require('express-validator'); 
const { addCharacter, updateCharacter, disableCharacter } = require('../controllers/characterController');
const { existIdCharacter } = require('../helpers/db-validators');
const { validateCharacter } = require('../middlewares/validateCharacter');
const { validateJWT } = require('../middlewares/validateJwt');

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
        validateCharacter,
        validateJWT
    ], addCharacter
);

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

router.delete('/:id',[
    param('id')
        .isNumeric()
        .custom(existIdCharacter)
        .withMessage('invalid id'),
    validateJWT,
    validateCharacter
], disableCharacter);

module.exports = router