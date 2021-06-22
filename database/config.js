const mongoose = require('mongoose');

const dbConnection = async() =>{

    const urlDB = process.env.MONGO_CNN;
    try {
        await mongoose.connect(urlDB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false

        });
        console.log('Base de datos conectada!');
    } catch (error) {
        throw new Error('Error al iniciar la base de datos')
        console.log('------------------------');
        console.log(error);
    }
}

module.exports = {
    dbConnection
}