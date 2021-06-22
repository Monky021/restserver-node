const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');


const getUsers = async(req= request, res= response) => {

    // Filtro de busqueda
    const {limite = 5, desde=0} = req.query;
    const limit = parseInt(limite);
    const query = {status: true};
    const from = parseInt(desde);
    //Busquedas en la base de datos 
 
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).limit(limit).skip(from)
    ]);
    //respuesta al cliente
    res.status(200).json({
        total,
        data:{
            limit,
            from,
            users
        }
    })
}

const createUsers = async (req, res= response) => {

    

    const {name, email, password, role} = req.body;

    const user = new User({name, email, password, role});

    //Verificacion del correo para ver si existe

    
    //encriptacion de la contraseña 
    const salt = bcrypt.genSaltSync(15);
    user.password = bcrypt.hashSync(password, salt);
    
    //Gardar la informacion en la DB

    await user.save();

    res.status(200).json({
        msg: 'post api',
        user
    })
}

const putUsers = async(req= request, res= response) => {

    const id = req.params.id;

    const {_id, password,google, correo, ...u} = req.body;

    
    //Validar id en la base de datos
    if(password){

        //encriptacion de la contraseña 
        const salt = bcrypt.genSaltSync(15);
        u.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, u, {new: true})

    res.status(200).json(user);
}
const patchUser = (req, res= response) => {
    res.status(200).json({
        msg: 'path api'
    })
}

const deleteUsers = async(req= request, res= response) => {
    const {id} = req.params;
    

    //borrado fisicamente
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {status: false});
    

    res.status(200).json(user)
}

module.exports ={

    getUsers,
    createUsers,
    putUsers,
    patchUser,
    deleteUsers,
}