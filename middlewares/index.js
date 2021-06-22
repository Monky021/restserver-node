

const validateFiels  = require('../middlewares/validate-fields');
const validateJWT  = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-roles');


module.exports={
    ...validateFiels,
    ...validateJWT,
    ...validateRole
}