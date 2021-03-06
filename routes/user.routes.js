
const { Router } = require('express');
const { check } = require('express-validator');
const { isRoleValid, emailExists, idExists } = require('../helpers/db-validators');

const {validateFiels, validateJWT, adminRole, roleValid} = require('../middlewares')

const { getUsers, createUsers, putUsers, deleteUsers, patchUser } = require('../controllers/usersConstrollers');




const router = Router();

router.get('/', getUsers);

//Create user
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail().custom(emailExists),
    
    check('password', 'La contraseña tener mas de 6 caracteres').isLength({min:6}),
    //check('role', 'No tiene un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValid),
    validateFiels

] ,createUsers);

//Update user
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId().custom(idExists),
    check('role').custom(isRoleValid),
    validateFiels
], putUsers);
router.patch('/', patchUser)
router.delete('/:id',[
    validateJWT,
    //adminRole,
    roleValid('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId().custom(idExists),
    validateFiels
] ,deleteUsers);


module.exports= router;