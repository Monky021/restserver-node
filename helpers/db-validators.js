const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role='') =>{
    const existsRole = await Role.findOne({role});
    if(!existsRole){
        throw new Error(`El rol ${role} no esta definido en la base de datos`)
    }

}


const emailExists = async( email ) => {

    const  emailExists = await User.findOne({email});

    if (emailExists){
        throw new Error(`El correo electronico ${email} ya esta registrado en la base de datos`)
    }

}

const idExists = async (id) => {
    const idExists = await User.findById(id)

    if(!idExists){
        throw new Error(`El id no se encuentra en la base de datos`); 
    }
}
module.exports={
    isRoleValid,
    emailExists,
    idExists

}