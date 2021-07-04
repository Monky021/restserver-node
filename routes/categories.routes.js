const { Router } = require('express');
const { check } = require('express-validator');
const { getCategories, createCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categoriasControllers');
const { categoryExists } = require('../helpers/db-validators');

const { validateFiels, validateJWT, adminRole } = require('../middlewares');

const router = Router();


//obtener todas las categorias - publico
router.get('/', getCategories);

//obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'no es un id de mongo').isMongoId().custom(categoryExists),
    validateFiels
], getCategory);

//Crear categorias - privado
router.post('/',[
    validateJWT,
    check('name', 'El nombre es requerido').not().isEmpty(),
    validateFiels
] , createCategory);

//Actualizar - privado
router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('id', 'no es un id de mongo').isMongoId().custom(categoryExists),
    validateFiels
], updateCategory);

//Borrar categoria - admin

router.delete('/:id',[
    validateJWT,
    adminRole,
    check('id', 'no es un id de mongo').isMongoId().custom(categoryExists),
    validateFiels
] ,deleteCategory);














module.exports=router;