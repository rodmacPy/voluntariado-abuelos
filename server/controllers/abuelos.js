
const { Abuelo } = require('../models')

const obtenerProductos = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, Productos] = await Promise.all([
        Abuelo.countDocuments(query),
        Abuelo.find(query)
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
const obtenerProducto = async(req, res = response ) => {

    const { id } = req.params;
    const producto = await Abuelo.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json( producto );

}

const crearAbuelo = async (req, res) => {

    // const nombre = req.body.nombre.toUpperCase();
    // const { estado, usuario, ...body } = req.body
    const { estado, usuario, nombre, fecha_nacimiento, genero, direccion, ciudad} = req.body

    const abueloDB = await Abuelo.findOne({nombre})

    if (abueloDB) {
        return res.status(400).json({
            msg: `El Abuelo ${abueloDB.nombre}, ya existe`
        })
    }


    //Generar la data a guardar
    const data = {
        nombre: nombre.toUpperCase(),
        fecha_nacimiento, genero, direccion, ciudad,
        usuario: req.usuario._id,
    }
    const abuelo = new Abuelo(data);

    //Guardar DB
    await abuelo.save();

    res.status(201).json(abuelo);
}

const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Abuelo.findByIdAndUpdate(id, data, { new: true })

    res.json(producto);
}

const borrarProducto = async (req, res) => {
    const { id } = req.params;
    const productoBorrada = await Abuelo.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(productoBorrada)
}

module.exports = {
    actualizarProducto,
    borrarProducto,
    crearAbuelo,
    obtenerProducto,
    obtenerProductos,
}