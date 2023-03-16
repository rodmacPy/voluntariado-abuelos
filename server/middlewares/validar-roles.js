

const adminRole = (req, res, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'se quiere verificar el rol sin validad el roken primero'
        })
    }
    const {rol, nombre} = req.usuario

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - no puede hacer esto`
        })
    }

    next();
}

const tieneRole = (...roles) =>{
    
    return (req, res, next) =>{

        if(!req.usuario){
            return res.status(500).json({
                msg: 'se quiere verificar el rol sin validad el roken primero'
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next()
    }
}
module.exports = {
    adminRole,
    tieneRole
}