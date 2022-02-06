const router = require('express').Router();
const {check, param } = require('express-validator');   
const { addGenre, findAllGenre,  disableGenre, updateGenre, findIdGenre } = require('../controllers/genreController');
const { existGenre } = require('../helpers/db-validators');
const { validateGenre } = require('../middlewares/validateGenre');
const { validateJWT } = require('../middlewares/validateJwt');

//ruta para crear un género
router.post('/',[
    check('name')
        .notEmpty()
        .withMessage('name is required.')
        .isLength({min: 1,max:50})       
        .withMessage('name must be between 1 and 50 characters')
        .custom(existGenre),
    validateGenre,
    validateJWT
], addGenre
);


//ruta para actualizar un género
router.put('/:id',[
    check('name')
        .notEmpty()
        .withMessage('name is required.')
        .isLength({min: 1,max:50})       
        .withMessage('name must be between 1 and 50 characters')
        .custom(existGenre),
    param('id')
        .isNumeric()
        .withMessage('invalid id'), 
    validateJWT
], updateGenre
);

//ruta para desactivar un género
router.delete('/:id',[
    param('id')
        .isNumeric()
        .withMessage('invalid id'),
    validateJWT
], disableGenre
)

//ruta para listar los géneros
router.get('/',[ 
    validateJWT
], findAllGenre );

//ruta para ver un género
router.get('/:id',[
    param('id')
        .isNumeric()
        .withMessage('invalid id'),  
    validateJWT
], findIdGenre );

module.exports = router;