const fs = require('fs')
const path = require('path')
const { Actividad } = require('../models');
const { subirArchivo } = require('../helpers');
const { actualizarImagen } = require('./uploads');

const obtenerActividades = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, actividades] = await Promise.all([
            Actividad.countDocuments(query),
            Actividad.find(query)
                .populate('usuario', 'nombre')
                .populate('usuarios', 'nombre')
                .populate('abuelos', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.json({
            ok: true,
            total,
            actividades
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las actividades'
        });
    }
};

const obtenerActividad = async (req, res) => {

    const { id } = req.params;
    const actividad = await Actividad.findById(id)
        .populate('usuarios', 'nombre')
        .populate('abuelos', 'nombre')
        .populate('usuario', 'nombre');

    res.json(actividad);

}




const crearActividad = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        // const { archivo } = req.files;

        // Llamar a la función subirArchivo para guardar la imagen
        const nombreImg = await subirArchivo(req.files, ['png', 'jpg', 'jpeg', 'gif'], 'actividad');

        // Crear una nueva actividad
        const actividad = new Actividad({
            nombre,
            img: nombreImg,
            descripcion,
            usuario: req.usuario._id,
        });

        // Guardar la actividad en la base de datos
        await actividad.save();

        res.json({
            ok: true,
            actividad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear la actividad'
        });
    }
};


const agregarUsuarioActividad = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la actividad de los parámetros de la URL

    try {
        // Buscar la actividad por su ID
        const actividad = await Actividad.findById(id);

        if (!actividad) { // Si no se encuentra la actividad, devolver un error
            return res.status(404).json({
                ok: false,
                msg: 'Actividad no encontrada'
            });
        }

        // Obtener el ID del usuario desde el token
        const usuarioActual = req.usuario._id;

        // Agregar el ID del usuario a la lista de usuarios de la actividad
        actividad.usuarios.push(usuarioActual);
        await actividad.save();

        // Devolver la actividad actualizada
        res.json({
            ok: true,
            actividad
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al agregar usuario a la actividad'
        });
    }
}

const actualizarActividad = async (req, res) => {

    const { id } = req.params;
    // const { archivo } = req.files;
    const { nombre, descripcion } = req.body;
    try {
        const actividad = await Actividad.findById(id);
        // console.log(actividad)
        if (!actividad) {
            return res.status(404).json({
                msg: 'No existe una actividad con ese id'
            });
        }
        // Limpiar imágenes previas
        if (actividad.img) {
            const pathImagen = path.join(__dirname, `../uploads/actividad/${actividad.img}`);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }

        const nombreImagen = await subirArchivo(req.files, undefined, 'actividad');
        actividad.nombre = nombre;
        actividad.img = nombreImagen;
        actividad.descripcion = descripcion;
        actividad.usuario = req.usuario._id

        await actividad.save();

        res.json(actividad);

    } catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar la actividad'
        });
    }

}


const borrarActividad = async (req, res) => {
    const { id } = req.params;
    const actividadBorrada = await Actividad.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(actividadBorrada)
}

module.exports = {
    actualizarActividad,
    borrarActividad,
    crearActividad,
    agregarUsuarioActividad,
    obtenerActividades,
    obtenerActividad
}