

const { Schema, model } = require('mongoose');
const ActividadSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    descripcion: {
        type: String,
    },
    usuarios: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
        },
    ],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});
ActividadSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data
}


module.exports = model('Actividad', ActividadSchema)