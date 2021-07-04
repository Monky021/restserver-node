const { request, response } = require("express");
const { Category } = require('../models');

const getCategories = async (req = request, res = response) => {

    const {limite = 5, desde =0} = req.query;
    const query = {status: true}


    try {
        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .populate('user', 'name')
                .skip(Number(desde))
                .limit(Number (limite)),
        ])

        res.status(201).json({
            total,
            categories
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte al administrador'
        })
    }

}
const getCategory = async (req = request, res = response) => {

    const {id} = req.params;

    try {
        const category = await Category.findById(id).
        populate('user', 'name');

       
        res.status(200).json(category);
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte al administrador'
        })
    }

}

const createCategory = async (req = request, res = response) => {



    try {

        const name = req.body.name.toUpperCase();

        const categoryDb = await Category.findOne({ name })
        
        if (categoryDb) {
            return res.status(400).json({
                msg: `La categoria ${categoryDb.name} ya existe.`
            })
        }
        //Generar y praparar la data para guargar 
        
        const data = {
            name,
            user: req.user._id
        }
        const category = new Category(data);

        //Guardar data
        await category.save();

        res.status(201).json({
            msg: 'Categoria creada con exito',
            category
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte al administrador'
        })
    }

}

const updateCategory = async (req = request, res = response) => {

    const {id} = req.params;
    const {status, user, ...data} = req.body;

    data.name = data.name.toUpperCase();

    data.user = req.user._id;
    
    try {
        
        const categoryUpdate = await Category.findByIdAndUpdate(
            id,
            data, 
            {new:true}
        );

        

        res.status(201).json(categoryUpdate);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte al administrador'
        })
    }

}

const deleteCategory = async (req = request, res = response) => {

    const {id} = req.params;

    try {
        const categoryDelete = await Category.findByIdAndUpdate(id, {status: false}, {new:true})
       
        res.status(200).json(categoryDelete);
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte al administrador'
        })
    }

}



module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}