const { request, response } = require("express");


const adminRole = (req= request, res=response, next ) =>{


    if(!req.user){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token'
        })
    }


    const {role, name} = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no tiene permisos de administrador`
        })

    }
    next();
}

const roleValid = (...roles ) => {


    return (req= request, res=response, next ) =>{

        if(!req.user){
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin validar el token'
            })
        }
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }


}
module.exports={
    adminRole,
    roleValid
}