

const validarArchivoSubir = (req, res, next) =>{

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json('No hay archivos que subir - ValidarArchivoSubit');
        return;
    }

    next()
}

module.exports = {
    validarArchivoSubir
}