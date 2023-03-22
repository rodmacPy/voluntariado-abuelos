const path = require('path')
const fs = require('fs')
const { subirArchivo } = require("../helpers");

const { Usuario, Actividad, Abuelo } = require('../models');
const abuelos = require('../models/abuelos');

const cargarArchivo = async (req, res) => {

    // Imagenes
    try {
        // const nombre = await subirArchivo(req.files, ['txt','md'], 'textos')
        const nombre = await subirArchivo(req.files, undefined, 'productos')
        res.json({
            nombre
        })

    } catch (msj) {
        res.status(400).json({ msj });
    }
}

const actualizarImagen = async (req, res) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'actividades':
            modelo = await Actividad.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe una actividad con el id ${id}`
                });
            }
            break;
        case 'abuelos':
            modelo = await Abuelo.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un abuelo con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    // Limpiar imágenes previas
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);
}


const mostrarImagen = async (req, res) => {


    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;

        case 'abuelos':
            modelo = await abuelos.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un abuelo con el id ${id}`
                });
            }

            break;
        case 'actividad':
            modelo = await Actividad.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe una actividad con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }


    // Limpiar imágenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg')

    res.sendFile(pathImagen);

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}