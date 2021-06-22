const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const validateJWT = async(req= request, res=response, next) =>{

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETKEY)
        //Leer el usuario del uid
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg:'Token no válido'
            })
        }

        //verificar el estado del usuario
        if(!user.status){
            return res.status(401).json({
                msg:'Token no válido'
            })
        }
        
        req.user= user;
        req.uid=uid;
        next();
        
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'token no válido'
        })
    }   


}


module.exports={
    validateJWT
}