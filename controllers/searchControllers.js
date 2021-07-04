const { request, response } = require("express");
const { ObjectId} = require('mongoose').Types;
const {Product,User, Category} = require("../models");

const allowedCollectiones = [
    'category',
    'product',
    'role',
    'users',
]


const searchUser = async( term='', res=response) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const user = await User.findById(term);

        return res.json({
            results:(user)?[user] : []
        })
    }
    const regExp = RegExp(term,'i');

    const [users, countUsers ] = await Promise.all([
        User.find({
            $or:[
                {name: regExp},
                {email: regExp}
            ],
            $and: [{status: true}]
        }),
        User.countDocuments({
            $or:[
                {name: regExp},
                {email: regExp}
            ],
            $and: [{status: true}]
        }),
    ]);

    return res.json({
        countUsers,
        results: users
    })

}

const searchProducts = async(term='', res=response)=>{

    const isMongoId = ObjectId.isValid(term);
    if(isMongoId){
        const product = await Product.findById(term)
        .populate('category', 'name');

        return res.json({
            results: (product)? [product] : []
        });
    }

    const regExp = RegExp(term, 'i');

    const category = await Category.findOne({name: regExp})
    
    
    const [countProducts, products] = await Promise.all([
        
        Product.countDocuments({
            $or:[
                {name: regExp},
                {category: category?._id}
            ]
        }),
        Product.find({
            $or:[
                {name: regExp},
                {category: category?._id}
            ]
        }).populate('category', 'name').populate('user', 'name')
    ])
   
    

    res.json({
        countProducts,
        results:products
    })
}

const searchCategories = async(term='', res=response) => {
    const isMongoId = ObjectId.isValid(term);

    if(isMongoId){
        const category = await Category.findById(term);

        return res.json({
            results: (category)? [category] : []
        });
    }

    const regExp = RegExp(term, 'i');

    const [countCategories, categories] = await Promise.all([
        Category.countDocuments({
            $and:[
                {name:regExp},
                {status: true}
            ]
        }),
        Category.find({
            $and:[
                {name:regExp},
                {status: true}
            ]
        })
    ])

    return res.json({
        countCategories,
        results: categories
    })
} 

const search = async(req=request, res= response) => {

    const { collection, term } = req.params;

    
    if (!allowedCollectiones.includes(collection)) {
        return res.status(400).json({
            msg:`Las colecciones permitidas son ${allowedCollectiones}`
        });

    }
    switch(collection){

        case 'category':
            searchCategories(term, res)
            break;
        case 'product':
            searchProducts(term, res);
            break;
        case 'users':
            searchUser(term, res);
            break;

        default: 
            return res.status(500).json({
                msg:'Se le olvido hacer esta busqueda'
            })

    }

    
}



module.exports={
    search
}