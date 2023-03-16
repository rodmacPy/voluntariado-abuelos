
const { Producto } = require('../models')

const obtenerProductos = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, Productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
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
    const producto = await Producto.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json( producto );

}

const crearProducto = async (req, res) => {

    // const nombre = req.body.nombre.toUpperCase();
    const { estado, usuario, ...body } = req.body

    const productoDB = await Producto.findOne({ nombre: body.nombre })

    if (productoDB) {
        return res.status(400).json({
            msg: `La Producto ${productoDB.nombre}, ya existe`
        })
    }


    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    }
    const producto = new Producto(data);

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);
}

const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    res.json(producto);
}

const borrarProducto = async (req, res) => {
    const { id } = req.params;
    const productoBorrada = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(productoBorrada)
}

module.exports = {
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProducto,
    obtenerProductos,
}