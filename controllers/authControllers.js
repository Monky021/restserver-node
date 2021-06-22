const {response, request} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const login = async(req= request, res= response) => {

    const {email, password} = req.body;
    
    try {

        //verificar si el email existe
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                msg:'Correo / contraseña incorrectos'
            })
        }
        //verificar estado del usuario
        if(!user.status){
            return res.status(400).json({
                msg:'Usuario en estado false'
            })
        }
        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword){
            return res.status(404).json({
                msg:'Correo / contraseña incorrectos - password'
            })
        }
        //generar el jwt 
        
        const token = await generateJWT(user.id);


        return res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'hable con el administrador'

        })
    }
}



module.exports = {
    login
}