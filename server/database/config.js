const mongoose = require('mongoose')
mongoose.set('strictQuery', false);


const dbConnection = async() => {


    try {
        
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log('Base de datos conectada')

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos')
    }
}

module.exports = dbConnection