const fs = require('fs')
const path = require('path')
const { subirArchivo } = require('../helpers');
const { Abuelo } = require('../models')

const obtenerAbuelos = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, abuelos] = await Promise.all([
        Abuelo.countDocuments(query),
        Abuelo.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        msg: 'get API - controlador - Productos',
        abuelos
    });
}


const obtenerAbuelo = async (req, res = response) => {

    const { id } = req.params;
    const abuelo = await Abuelo.findById(id)
        .populate('usuario', 'nombre');

    res.json(abuelo);

}

const crearAbuelo = async (req, res) => {

    // const nombre = req.body.nombre.toUpperCase();
    // const { estado, usuario, ...body } = req.body
    const { estado, usuario, nombre, fecha_nacimiento, genero, direccion, ciudad, img } = req.body
    const { archivo } = req.files;

    const nombreImg = await subirArchivo(archivo, ['png', 'jpg', 'jpeg', 'gif'], 'abuelos');


    //Generar la data a guardar
    const data = {
        nombre: nombre.toUpperCase(),
        fecha_nacimiento, genero, direccion, ciudad,
        img: nombreImg,
        usuario: req.usuario._id,
    }
    const abuelo = new Abuelo(data);

    //Guardar DB
    await abuelo.save();

    res.status(201).json(abuelo);
}

const actualizarAbuelo = async (req, res) => {
    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;
    const { archivo } = req.files;

    try {
        const abuelo = await Abuelo.findById(id);
        
        if (!abuelo) {
            return res.status(404).json({
                msg: 'No existe una actividad con ese id'
            });
        }
        // Limpiar imágenes previas
        if (abuelo.img) {
            const pathImagen = path.join(__dirname, `../uploads/abuelos/${abuelo.img}`);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }

        const nombreImagen = await subirArchivo(archivo, undefined, 'abuelos');

        abuelo.nombre = data.nombre;
        abuelo.img = nombreImagen;
        abuelo.fecha_nacimiento = data.fecha_nacimiento
        abuelo.usuario = req.usuario._id
        abuelo.genero = data.genero
        abuelo.direccion = data.direccion
        abuelo.ciudad = data.ciudad
        
        await abuelo.save();

        res.json(abuelo);

    } catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar la actividad'
        });
    }
}


const borrarAbuelo = async (req, res) => {
    const { id } = req.params;
    const abueloBorrado = await Abuelo.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(abueloBorrado)
}

module.exports = {
    actualizarAbuelo,
    borrarAbuelo,
    crearAbuelo,
    obtenerAbuelo,
    obtenerAbuelos,
}