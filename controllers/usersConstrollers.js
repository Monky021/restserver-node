const {response, request} = require('express');


const getUsers = (req= request, res= response) => {

    const query = req.query;
    res.status(200).json({
        msg: 'get api',
        query
    })
}

const createUsers = (req, res= response) => {

    const {nombre, edad} = req.body;

    res.status(200).json({
        msg: 'post api',
        nombre, 
        edad
    })
}

const putUsers = (req, res= response) => {

    const id = req.params.id;

    res.status(200).json({
        msg: 'put api',
        id
    })
}
const patchUser = (req, res= response) => {
    res.status(200).json({
        msg: 'path api'
    })
}

const deleteUsers = (req, res= response) => {
    res.status(200).json({
        msg: 'delete api'
    })
}

module.exports ={

    getUsers,
    createUsers,
    putUsers,
    patchUser,
    deleteUsers,
}