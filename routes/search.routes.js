const { Router } = require('express');
const { check } = require('express-validator');

const { validateFiels } = require('../middlewares/validate-fields');
const { login, googleSingin } = require('../controllers/authControllers');
const { search } = require('../controllers/searchControllers');


const router = Router();

router.get('/:collection/:term', search )

module.exports = router;