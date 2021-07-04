
const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productControllers');
const { productExists, productExistsById } = require('../helpers/db-validators');

const { validateFiels, validateJWT, adminRole } = require('../middlewares');



const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'No es un id de mongo').isMongoId().custom(productExistsById),
    validateFiels
],getProduct);


router.post('/', [
    validateJWT,
    check('name', 'El nombre del producto es obligatorio').not().isEmpty().custom(productExists),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    validateFiels
],createProduct);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id de mongo').isMongoId().custom(productExistsById),
    
    validateFiels

],updateProduct)


router.put('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id de mongo').isMongoId().custom(productExistsById),
    validateFiels
],deleteProduct)
    
module.exports = router;