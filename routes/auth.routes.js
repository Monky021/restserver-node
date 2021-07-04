const { Router } = require('express');
const { check } = require('express-validator');

const { validateFiels } = require('../middlewares/validate-fields');
const { login, googleSingin } = require('../controllers/authControllers');


const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validateFiels
],login);
 
router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    
    validateFiels
],googleSingin);

module.exports = router;