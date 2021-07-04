const {Category, User, Role, Product} = require('../models')



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

    const idExists = await User.findById(id);

    if(!idExists){
        throw new Error(`El id no se encuentra en la base de datos`); 
    }
}

const categoryExists = async (id) => {

    const category = await Category.findById(id);
    
    if(!category){
        throw new Error('La categoria no existe')
    }
}

const productExists = async(name) => {

    const product = await Product.findOne({name});
    
    if(product){
        throw new Error('El producto ya existe')
    }
}

const productExistsById = async(id)=> {
    const product = await Product.findById(id);

    if(!product){
        throw new Error('El producto no existe')
    }
}
module.exports={
    categoryExists,
    emailExists,
    idExists,
    isRoleValid,
    productExists,
    productExistsById

}