const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleValidator } = require('../helpers/google-validators');


const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar si el email existe
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                msg: 'Correo / contraseña incorrectos'
            })
        }
        //verificar estado del usuario
        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario en estado false'
            })
        }
        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(404).json({
                msg: 'Correo / contraseña incorrectos - password'
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

const googleSingin = async (req = request, res = response) => {

    const { id_token } = req.body;
    
    try {
        const {name, img, email} = await googleValidator(id_token);
        console.log(name, img, email);
        let user = await User.findOne({email});
        //Si el usuario no existe se crea
        if (!user){
            const data = {
                name,
                email, 
                password:'.p',
                img,
                google: true

            }
            user= new User(data);
            await user.save();
        }
        //si el usuario esta en db
        if (!user.status) {
            return res.status(401).json({
                msg: 'Hable con el administrador'
            });
        }
        //generar el jwt 

        const token = await generateJWT(user.id);
        res.status(200).json({
            user,
            token
        })

    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es valido'
        })
    }
}

module.exports = {
    login,
    googleSingin
}