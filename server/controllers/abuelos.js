
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
        Productos: abuelos
    });
}


const obtenerAbuelo = async(req, res = response ) => {

    const { id } = req.params;
    const abuelo = await Abuelo.findById( id )
                            .populate('usuario', 'nombre');

    res.json( abuelo );

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

const actualizarAbuelo = async (req, res) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const abuelo = await Abuelo.findByIdAndUpdate(id, data, { new: true })

    res.json(abuelo);
}


const borrarAbuelo = async (req, res) => {
    const { id } = req.params;

    res.json(id);
}


// const borrarAbuelo = async (req, res) => {
//     const { id } = req.params;
//     console.log(id)
//     // const abueloBorrado = await Abuelo.findByIdAndUpdate(id, { estado: false }, { new: true });

//     // res.json(abueloBorrado)
// }

module.exports = {
    actualizarAbuelo,
    borrarAbuelo,
    crearAbuelo,
    obtenerAbuelo,
    obtenerAbuelos,
}