const { Role } = require("../models");





const crearRole = async (req, res) => {

    const rol = req.body.rol.toUpperCase()

    const roleDB = await Role.findOne({ rol })

    if (roleDB) {
        return res.status(400).json({
            msg: `El Role ${roleDB.nombre}, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        rol,
        usuario: req.usuario._id
    }
    const role = new Role(data);

    //Guardar DB
    await role.save();

    res.status(201).json(role);
}

module.exports = {
    crearRole
}