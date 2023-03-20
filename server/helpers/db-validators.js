const { Usuario, Abuelo, Actividad } = require('../models');
const Role = require('../models/role');


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado`)
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El id: ${id} no existe`)
    }

}
const existeActividadPorId = async (id) => {
    const existeCategoria = await Actividad.findById( id );
    if (!existeCategoria) {
        throw new Error(`El id ${id} no esta registrado`)
    }
}

const existeAbueloPorId = async (id) => {
    const existeAbuelo = await Abuelo.findById( id );
    if (!existeAbuelo) {
        throw new Error(`El id ${id} no esta registrado`)
    }
}
 //Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) =>{
    
    const incluida = colecciones.includes(coleccion);

    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`)
    }

    return true;
}
module.exports = {
    esRoleValido,
    existeUsuarioPorId,
    existeActividadPorId,
    existeAbueloPorId,
    coleccionesPermitidas
}