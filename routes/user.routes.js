
const { Router } = require('express');
const { getUsers, createUsers, putUsers, deleteUsers, patchUser } = require('../controllers/usersConstrollers');

const router = Router();


router.get('/', getUsers);
router.post('/', createUsers);
router.put('/:id', putUsers);
router.patch('/', patchUser)
router.delete('/', deleteUsers);


module.exports= router;