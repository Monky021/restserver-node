const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authControllers');
const { emailExists } = require('../helpers/db-validators');
const { validateFiels } = require('../middlewares/validate-fields');


const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validateFiels
],login);

module.exports = router;