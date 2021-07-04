const { request, response } = require("express");
const  {Product, Category} = require('../models');
const user = require("../models/user");
const getProducts = async(req= request, res=response) => {

    try {
        
        const {limite = 5, desde =0} = req.query;
        const query = {status: true}
        
        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .populate('category', 'name')
                .populate('user', 'name')
                .skip(Number(desde))
                .limit(Number (limite)),
        ])

        res.status(201).json({
            total,
            products
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Contacte al administrador'
        })
    }
}

const getProduct = async(req= request, res=response) => {
    const {id} = req.params;

    try {
        
        const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');

        res.status(200).json(product)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Contacte al administrador'
        })
    }
}
const createProduct = async(req= request, res=response) => {

    try {
        
        const {status,user, ...data} = req.body;

        const category = await Category.findOne({name: data.category})
       
        
        if(!category){
            return res.status(404).json({
                msg:'La categoria no existe'
            })
        }
        

        const product = {
            ...data,
            name: data.name.toUpperCase(),
            user: req.user._id,
            category: category._id
        }
        const  createProduct = new Product(product);
        
        await createProduct.save()

        res.status(201).json(createProduct)


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Contacte al administrador'
        })
    }
}
const updateProduct = async(req= request, res=response) => {

    const {id} = req.params;
    const {status,user, ...data} = req.body;

    
    try {

        
        const category = await Category.findOne({name: data.category})
        
        if(category){
            
            data.category=category._id    
        }
        if(data.name){
            data.name=data.name.toUpperCase()
        }
        
        const product = {
            ...data,
            user: req.user._id,
            
        }

        const productUpdate = await Product.findByIdAndUpdate(id, product, {new: true})
        
        res.status(200).json(productUpdate);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Contacte al administrador'
        })
    }
}

const deleteProduct = async(req= request, res=response) => {
    const {id} = req.params;


    try {
        
        const deleteProduct = await Product.findByIdAndUpdate(id, {status: false}, {new: true})
        res.status(200).json(deleteProduct)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Contacte al administrador'
        })
    }
}

module.exports={
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct

}