

const { Schema, model } = require('mongoose')

const AbueloSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    img: {
        type: String
    },
    fecha_nacimiento: {
        type: Date,
        required: [true, 'El nacimiento es obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    genero: {
        type: String,
        enum: ['Masculino', 'Femenino', 'Otro'],
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})
AbueloSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data
}

module.exports = model('Abuelo', AbueloSchema)

