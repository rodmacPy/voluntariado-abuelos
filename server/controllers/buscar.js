const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Abuelo, Actividad, Role, Usuario } = require('../models');

const coleccionesPermitidas = [
    'abuelos',
    'actividad',
    'usuarios',
    'role'
];

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); // TRUE 

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });

}

const buscarAbuelo = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); // TRUE 

    if (esMongoID) {
        const abuelo = await Abuelo.findById(termino);
        return res.json({
            results: (abuelo) ? [abuelo] : []
        });
    }

    const regex = new RegExp(termino, 'i')
    const abuelos = await Abuelo.find({ nombre: regex, estado: true })

    res.json({
        results: abuelos
    })

}

const buscarActividad = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); // TRUE 

    if (esMongoID) {
        const actividad = await Actividad.findById(termino);
        return res.json({
            results: (actividad) ? [actividad] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const actividades = await Actividad.find({ nombre: regex, estado: true })

    res.json({
        results: actividades
    });

}


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'abuelos':
            buscarAbuelo(termino, res);
            break;
        case 'actividad':
            buscarActividad(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            })
    }

}

module.exports = {
    buscar
};
