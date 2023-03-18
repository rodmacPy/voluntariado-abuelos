
const { Actividad } = require('../models')

const obtenerProductos = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, Productos] = await Promise.all([
        Actividad.countDocuments(query),
        Actividad.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        msg: 'get API - controlador - Productos',
        Productos
    });
}
const obtenerProducto = async (req, res = response) => {

    const { id } = req.params;
    const producto = await Actividad.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json(producto);

}

const crearActividad = async (req, res) => {
    try {
        const { nombre, img, descripcion, usuario } = req.body;

        // Validar si el usuario existe
        const existeUsuario = await Usuario.findById(usuario);
        if (!existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        // Crear una nueva actividad
        const actividad = new Actividad({
            nombre,
            img,
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

const crearActividad2 = async (req, res) => {

    // const nombre = req.body.nombre.toUpperCase();
    const { estado, usuario, ...body } = req.body

    const actividadDB = await Actividad.findOne({ nombre: body.nombre })

    if (actividadDB) {
        return res.status(400).json({
            msg: `La Producto ${actividadDB.nombre}, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    }
    const producto = new Actividad(data);

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);
}

const agregarUsuarioActividad = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la actividad de los parámetros de la URL
    const { usuarioId } = req.body; // Obtener el ID del usuario que se agregará de la solicitud

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

        // Comprobar que el usuario que intenta agregar el usuario sea el dueño de la actividad
        if (actividad.usuario.toString() !== usuarioActual.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No estás autorizado para realizar esta acción'
            });
        }

        // Agregar el ID del usuario a la lista de usuarios de la actividad
        actividad.usuarios.push(usuarioId);
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



const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Actividad.findByIdAndUpdate(id, data, { new: true })

    res.json(producto);
}

const borrarActividad = async (req, res) => {
    const { id } = req.params;
    const actividadBorrada = await Actividad.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(productoBorrada)
}

module.exports = {
    actualizarProducto,
    borrarActividad,
    crearActividad,
}